import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Platform,
  Dimensions,
  SafeAreaView,
} from "react-native";
import MapView, {
  Marker,
  AnimatedRegion,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import { usePubNub } from "pubnub-react";
import {
  Accuracy,
  requestForegroundPermissionsAsync,
  watchPositionAsync,
} from "expo-location";
import useLocation from "../../hooks/useLocation";

// const { width, height } = Dimensions.get("window");

// const ASPECT_RATIO = width / height;
// const LATITUDE_DELTA = 0.0922;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const MovingMap = ({ route }) => {
  const { location } = route.params;

  // console.log(location);
  // const INITIAL_LAT = useRef(currentLocation.location.coords.latitude);
  // const INITIAL_LNG = useRef(currentLocation.location.coords.longitude);

  // const marker = useRef();
  const {
    latitude,
    longitude,
    coordinate,
    LATITUDE_DELTA,
    LONGITUDE_DELTA,
    marker,
  } = useLocation(location, true);

  // let subscriber;

  // const pubnub = usePubNub();
  // const [error, setError] = useState("");
  // const [latitude, setLatitude] = useState(INITIAL_LAT.current);
  // const [longitude, setLongitude] = useState(INITIAL_LNG.current);
  // const [coordinate, setCoordinate] = useState(
  //   new AnimatedRegion({
  //     latitude: INITIAL_LAT.current,
  //     longitude: INITIAL_LNG.current,
  //     latitudeDelta: 0,
  //     longitudeDelta: 0,
  //   })
  // );

  // useEffect(() => {
  //   const startWatching = async () => {
  //     try {
  //       const { status } = await requestForegroundPermissionsAsync();
  //       subscriber = await watchPositionAsync(
  //         {
  //           accuracy: Accuracy.BestForNavigation,
  //           timeInterval: 1000,
  //           distanceInterval: 10,
  //         },
  //         (position) => {
  //           const { latitude, longitude } = position.coords;

  //           console.log(position);

  //           const newCoordinate = {
  //             latitude,
  //             longitude,
  //           };

  //           if (Platform.OS === "android") {
  //             if (marker.current) {
  //               marker.current.animateMarkerToCoordinate(
  //                 newCoordinate,
  //                 500 // 500 is the duration to animate the marker
  //               );
  //             }
  //           } else {
  //             coordinate.timing(newCoordinate).start();
  //           }

  //           setLatitude(latitude);
  //           setLongitude(longitude);
  //         }
  //       );

  //       if (status !== "granted") {
  //         throw new Error("Location permission not granted");
  //       }
  //     } catch (err) {
  //       setError(err);

  //       console.log(err);
  //     }
  //   };

  //   startWatching();

  //   return () => {
  //     if (subscriber) {
  //       subscriber.remove();
  //       console.log("clear");
  //     }
  //   };
  // }, []);

  // useEffect(() => {
  // try {
  //   pubnub.publish({
  //     message: {
  //       latitude: latitude,
  //       longitude: longitude,
  //     },
  //     channel: "location",
  //   });
  // } catch (error) {
  //   console.log(error);
  // }
  // console.log("latitude", latitude);
  // console.log("longitude", longitude);
  // }, [latitude]);

  // useEffect(() => {}, [coordinate]);

  const getMapRegion = () => ({
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          showUserLocation
          followUserLocation
          loadingEnabled
          region={getMapRegion()}
          provider={PROVIDER_GOOGLE}
        >
          <Marker.Animated ref={marker} coordinate={coordinate} />
        </MapView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MovingMap;

// Todo move this component logic to useLocatiom
// Todo apply useLocation logic to the orignal driver map
// Todo test movment
// Todo find a way to check if the driver reach the user location
// Todo add the bottom sheet to the orignal driver map
// Todo show delever or cancle btns on the bottom sheet

// Todo this component should render diffrent content based on the design
// Todo fix orders style
// Todo fix orders style in create trip (keyboard bug)

// ! needed apis
// ! driver login
// ! get trips by driver id
// ! delever success
// ! delever canceled with a note
