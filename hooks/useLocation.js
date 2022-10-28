import { useState, useEffect, useRef } from "react";
import { Platform, Dimensions } from "react-native";
import { AnimatedRegion } from "react-native-maps";
import {
  Accuracy,
  requestForegroundPermissionsAsync,
  watchPositionAsync,
  getCurrentPositionAsync,
} from "expo-location";
import { usePubNub } from "pubnub-react";
import { sortCoords } from "../utils";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
// const LATITUDE_DELTA = 0.0922;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;

const useLocation = (
  curruntLocation,
  shouldWatch,
  orders,
  openRBSheet,
  navigation,
  shouldPublishToPubnub
) => {
  const pubnub = usePubNub();

  const INITIAL_LAT = useRef(
    curruntLocation ? curruntLocation.coords.latitude : null
  );
  const INITIAL_LNG = useRef(
    curruntLocation ? curruntLocation?.coords.longitude : null
  );
  const marker = useRef();
  const subscriber = useRef();

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [latitude, setLatitude] = useState(
    INITIAL_LAT?.current ? INITIAL_LAT.current : null
  );
  const [longitude, setLongitude] = useState(
    INITIAL_LNG?.current ? INITIAL_LNG.current : null
  );
  const [coordinate, setCoordinate] = useState(
    new AnimatedRegion({
      latitude: INITIAL_LAT?.current ? INITIAL_LAT.current : 0,
      longitude: INITIAL_LNG?.current ? INITIAL_LNG.current : 0,
      latitudeDelta: 0,
      longitudeDelta: 0,
    })
  );

  const [destination, setDestination] = useState();
  const [waypoints, setWaypoints] = useState([]);
  const [sortedCoords, setSortedCoords] = useState([]);
  const [curruntDest, setCurruntDest] = useState();
  const [isCurruntDestReached, setIsCurruntDestReached] = useState(false);
  const [isReachedPointDeliverd, setIsReachedPointDeliverd] = useState(true);

  const addresses = useRef(
    orders?.map((order) => ({
      latitude: +order.address.location_lat,
      longitude: +order.address.location_lng,
      id: order.id,
    }))
  );

  const requestLocationPermissions = async () => {
    const { status } = await requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
    }
    return status;
  };

  const startWatching = async () => {
    try {
      const status = await requestLocationPermissions();

      if (status !== "granted") return;

      subscriber.current = await watchPositionAsync(
        {
          accuracy: Accuracy.Highest,
          timeInterval: 1000,
          distanceInterval: 10,
          enableHighAccuracy: true,
        },
        (position) => {
          const { latitude, longitude } = position.coords;

          const isPointReached = arePointsNear(
            {
              latitude: latitude,
              longitude: longitude,
            },
            curruntDest,
            0.1
          );

          if (isPointReached) {
            setIsCurruntDestReached(true);
          }

          const newCoordinate = {
            latitude,
            longitude,
          };

          if (Platform.OS === "android") {
            if (marker.current) {
              marker.current.animateMarkerToCoordinate(
                newCoordinate,
                500 // 500 is the duration to animate the marker
              );
            }
          } else {
            coordinate.timing(newCoordinate).start();
          }

          setLatitude(latitude);
          setLongitude(longitude);
        }
      );
    } catch (err) {
      setErrorMsg(err);

      console.log(err);
    }
  };

  const getCurruntLocation = async () => {
    const status = await requestLocationPermissions();
    if (status !== "granted") return;
    const location = await getCurrentPositionAsync({});
    setLocation(location);
  };

  const publishToPubnub = () => {
    pubnub.publish({
      message: {
        latitude: latitude,
        longitude: longitude,
      },
      channel: "location",
    });
  };

  useEffect(() => {
    if (orders) {
      setSortedCoords(sortCoords(curruntLocation, addresses.current));
    }

    if (!shouldWatch) getCurruntLocation();

    return () => {
      if (subscriber.current) {
        subscriber.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (curruntDest && isReachedPointDeliverd) {
      if (!sortedCoords.length) {
        // handle trip end here
        console.log("done");

        return;
      }

      setIsReachedPointDeliverd(false);
      setIsCurruntDestReached(false);

      startWatching();
      console.log("watching start");
    }
  }, [curruntDest, isReachedPointDeliverd]);

  useEffect(() => {
    if (isCurruntDestReached) {
      // show bottom sheet
      openRBSheet();

      // stop position watching
      console.log("watching stoped");
      subscriber.current.remove();

      // setIsCurruntDestReached(false);
      if (sortedCoords.length) {
        const sortedCoordsCopy = [...sortedCoords];
        sortedCoordsCopy.shift();
        setSortedCoords(sortedCoordsCopy);
      }
    }
  }, [isCurruntDestReached]);

  useEffect(() => {
    if (sortedCoords.length) {
      if (!destination) {
        setDestination({
          latitude: sortedCoords[sortedCoords.length - 1].latitude,
          longitude: sortedCoords[sortedCoords.length - 1].longitude,
        });
      }

      if (!waypoints.length) {
        const sortedCoordsCopy = [...sortedCoords];
        sortedCoordsCopy.pop();
        setWaypoints(
          sortedCoordsCopy.map((coord) => ({
            latitude: coord.latitude,
            longitude: coord.longitude,
          }))
        );
      }

      if (sortedCoords[0]) {
        setCurruntDest(sortedCoords[0]);
      }
    }
  }, [sortedCoords]);

  useEffect(() => {
    if (shouldPublishToPubnub) publishToPubnub();
  }, [latitude]);

  function arePointsNear(checkPoint, centerPoint, km) {
    var ky = 40000 / 360;
    var kx = Math.cos((Math.PI * centerPoint.latitude) / 180.0) * ky;
    var dx = Math.abs(centerPoint.longitude - checkPoint.longitude) * kx;
    var dy = Math.abs(centerPoint.latitude - checkPoint.latitude) * ky;
    return Math.sqrt(dx * dx + dy * dy) <= km;
  }

  return {
    location,
    latitude,
    longitude,
    coordinate,
    LATITUDE_DELTA,
    LONGITUDE_DELTA,
    marker,
    errorMsg,
    destination,
    waypoints,
    sortedCoords,
    curruntDest,
    isCurruntDestReached,
    setIsReachedPointDeliverd,
  };
};

export default useLocation;
