import { useEffect, useRef, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions, SafeAreaView } from "react-native";
import MapViewDirections from "react-native-maps-directions";
import RBSheet from "react-native-raw-bottom-sheet";
import { MaterialIcons } from "@expo/vector-icons";

import { GOOGLE_MAPS_API_KEY } from "@env";
import useLocation from "../../hooks/useLocation";
import { Btn } from "../../components/Buttons";
import { COLORS, FONTS, SIZES } from "../../constants";
import Input from "../../components/Input";
import MapOverlayContent from "../../components/MapOverlayContent";

const Map = ({ navigation, route }) => {
  const { orders, location } = route.params;

  const [origin, setOrigin] = useState({
    latitude: location.coords.latitude,
    longitude: location.coords.latitude,
  });

  const [selectedOrder, setSelectedOrder] = useState(orders[0]);
  const [currentOrder, setCurrentOrder] = useState();
  const [note, setNote] = useState();
  const [noteError, setNoteError] = useState("");

  const refRBSheet = useRef();

  const openRBSheet = () => {
    refRBSheet.current.open();
  };

  const handelSubmit = (flag) => {
    if (flag === "cancel" && !note) {
      setNoteError("Please add a note");
      return;
    }

    // post the form with currunt order id
    // then close the RBSheet && setIsReachedPointDeliverd to true
    refRBSheet.current.close();
    setIsReachedPointDeliverd(true);
  };

  const handleMarkerPress = (id) => {
    if (isCurruntDestReached) return;

    const selectedOrder = orders.filter((order) => order.id === id)[0];

    openRBSheet();
    setSelectedOrder(selectedOrder);
  };

  const getMapRegion = () => ({
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  const {
    latitude,
    longitude,
    coordinate,
    LATITUDE_DELTA,
    LONGITUDE_DELTA,
    marker,
    destination,
    waypoints,
    sortedCoords,
    curruntDest,
    isCurruntDestReached,
    setIsReachedPointDeliverd,
  } = useLocation(location, true, orders, openRBSheet, navigation);

  useEffect(() => {
    if (location) {
      setOrigin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    }
  }, [location]);

  useEffect(() => {
    if (curruntDest) {
      const currentOrder = orders.filter(
        (order) => order.id === curruntDest.id
      )[0];
      setCurrentOrder(currentOrder);
    }
  }, [curruntDest]);

  // console.log("currentOrder", currentOrder);

  return (
    <SafeAreaView style={styles.container}>
      {origin && destination ? (
        <MapView
          showUserLocation
          followUserLocation
          loadingEnabled
          region={getMapRegion()}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
        >
          <Marker.Animated
            ref={marker}
            // coordinate={coordinate}
            coordinate={{
              latitude: latitude,
              longitude: longitude,
            }}
          >
            <MaterialIcons name="my-location" size={30} color="blue" />
          </Marker.Animated>

          {sortedCoords.map((coord, i) => {
            return (
              <Marker
                key={i}
                coordinate={{
                  latitude: coord.latitude,
                  longitude: coord.longitude,
                }}
                onPress={() => handleMarkerPress(coord.id)}
                // title={order.customer.name}
              />
            );
          })}
          {/* <MapViewDirections
            precision="high"
            origin={origin}
            destination={destination}
            apikey={GOOGLE_MAPS_API_KEY}
            strokeWidth={4}
            strokeColor="#6644ff"
            waypoints={waypoints.length ? waypoints : []}
            optimizeWaypoints={waypoints.length ? true : false}
            onStart={(params) => {
              // console.log("params on start", params);
            }}
            onReady={(result) => {
              // console.log("result on ready", result);
              // this.mapView.fitToCoordinates(result.coordinates, {
              //   edgePadding: {
              //     right: width / 20,
              //     bottom: height / 20,
              //     left: width / 20,
              //     top: height / 20,
              //   },
              // });
            }}
            onError={(errorMessage) => {
              console.log("GOT AN ERROR");
            }}
          /> */}
        </MapView>
      ) : null}
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000",
          position: "absolute",
        }}
      >
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={isCurruntDestReached ? false : true}
          closeOnPressMask={isCurruntDestReached ? false : true}
          height={300}
          customStyles={{
            wrapper: {
              backgroundColor: "rgba(0,0,0,.5)",
              height: 300,
            },
            draggableIcon: {
              backgroundColor: "#000",
            },
          }}
        >
          {isCurruntDestReached ? (
            <View
              style={{
                flex: 1,
                paddingVertical: SIZES.medium,
                paddingHorizontal: SIZES.large,
              }}
            >
              <View>
                <Text style={{ fontSize: SIZES.large, fontFamily: FONTS.bold }}>
                  Order
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  {currentOrder?.order_products?.map((product, i) => (
                    <View
                      key={i}
                      style={{
                        flexDirection: "row",
                        marginBottom: SIZES.base,
                        marginRight: SIZES.base,
                      }}
                    >
                      <Text>{product.product_name}</Text>
                      <Text>{product.qty}</Text>
                    </View>
                  ))}
                </View>
                <Text style={{ fontFamily: FONTS.bold }}>
                  Price :{" "}
                  <Text style={{ color: COLORS.red }}>
                    {currentOrder?.price}
                  </Text>
                </Text>
              </View>
              <Input
                value={note}
                onChange={(val) => setNote(val)}
                placeholder="Note ....."
                allowFontScaling={true}
                multiline={true}
                style={{
                  height: "auto",
                  borderWidth: 1,
                  marginTop: SIZES.large,
                }}
                error={noteError}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: SIZES.large,
                }}
              >
                <Btn
                  style={{
                    backgroundColor: COLORS.gray,
                    width: 150,
                    height: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: SIZES.large,
                  }}
                  onPress={() => handelSubmit("cancel")}
                >
                  <Text> Canceled</Text>
                </Btn>
                <Btn
                  style={{
                    backgroundColor: COLORS.yellow,
                    width: 150,
                    height: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: SIZES.large,
                  }}
                  onPress={() => handelSubmit("delever")}
                >
                  <Text> Deliver</Text>
                </Btn>
              </View>
            </View>
          ) : (
            // console.log("selorder")
            <MapOverlayContent order={selectedOrder} />
            // <Text>test</Text>
          )}
        </RBSheet>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default Map;

// [x] Todo open the bottom sheet when poin reached
// [x] Todo stop watching poition until the bottom sheet form submited
// [x] Todo handle last point reach and test one pont trip
// [x] Todo restyle driver trips
// Todo show customer and order details info when clicking on a marker
// Todo fit points to the map
// Todo check if i can show expected destination and time to reach every point
// Todo acuracy watch position

// Todo create and style view trip
