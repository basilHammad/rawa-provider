import { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Animated,
  Text,
  Button,
  View,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useHeaderHeight } from "@react-navigation/elements";
import RBSheet from "react-native-raw-bottom-sheet";

import MapOverlay from "../../components/MapOverlay";
import { Btn } from "../../components/Buttons";
import MapOverlayContent from "../../components/MapOverlayContent";

const OVERLAY_HEIGHT = 350;
const OVERLAY_GRAP_HEIGHT = 30;

const Map = ({ route }) => {
  const { isTrip, orders, cords } = route.params;
  const [selectedOrder, setSelectedOrder] = useState(isTrip ? orders[0] : null);
  const refRBSheet = useRef();

  const firstOrderCords =
    isTrip && orders[0]
      ? {
          lat: orders[0].address.location_lat,
          lng: orders[0].address.location_lng,
        }
      : null;

  const slideAnim = useRef(
    new Animated.Value(OVERLAY_HEIGHT - OVERLAY_GRAP_HEIGHT)
  ).current;

  const handleMarkerPress = (orderId) => {
    // slideUp();
    refRBSheet.current.open();
    const selectedOrder = orders.filter((order) => order.id === orderId)[0];
    setSelectedOrder(selectedOrder);
  };

  // return <Text>test</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        initialRegion={{
          latitude: firstOrderCords ? +firstOrderCords.lat : +cords.lat,
          longitude: firstOrderCords ? +firstOrderCords.lng : +cords.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
      >
        {isTrip && firstOrderCords ? (
          orders.map((order, i) => (
            <Marker
              key={i}
              coordinate={{
                latitude: +order.address.location_lat,
                longitude: +order.address.location_lng,
              }}
              title={order.customer.name}
              onPress={() => handleMarkerPress(order.id)}
            />
          ))
        ) : (
          <Marker
            coordinate={{
              latitude: +cords.lat,
              longitude: +cords.lng,
            }}
          />
        )}
      </MapView>
      {isTrip && firstOrderCords && (
        // <MapOverlay
        //   slideAnim={slideAnim}
        //   slideUp={slideUp}
        //   slideDown={slideDown}
        //   height={OVERLAY_HEIGHT}
        //   buttonHeight={OVERLAY_GRAP_HEIGHT}
        //   order={selectedOrder}
        // />
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
            closeOnDragDown={true}
            closeOnPressMask={true}
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
            <MapOverlayContent order={selectedOrder} />
          </RBSheet>
        </View>
      )}
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
