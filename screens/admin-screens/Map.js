import { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Animated,
  Text,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useHeaderHeight } from "@react-navigation/elements";

import MapOverlay from "../../components/MapOverlay";
import { Btn } from "../../components/Buttons";

const OVERLAY_HEIGHT = 350;
const OVERLAY_GRAP_HEIGHT = 30;

const Map = ({ route }) => {
  const { isTrip, orders, cords } = route.params;
  const [selectedOrder, setSelectedOrder] = useState(isTrip ? orders[0] : null);

  const firstOrderCords =
    isTrip && orders[0]
      ? {
          lat: orders[0].customer_address_id.location_lat,
          lng: orders[0].customer_address_id.location_lng,
        }
      : null;

  const slideAnim = useRef(
    new Animated.Value(OVERLAY_HEIGHT - OVERLAY_GRAP_HEIGHT)
  ).current;

  const slideUp = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const slideDown = () => {
    Animated.timing(slideAnim, {
      toValue: OVERLAY_HEIGHT - OVERLAY_GRAP_HEIGHT,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const handleMarkerPress = (orderId) => {
    slideUp();
    const selectedOrder = orders.filter((order) => order.id === orderId)[0];
    setSelectedOrder(selectedOrder);
  };

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        initialRegion={{
          latitude: firstOrderCords ? firstOrderCords.lat : cords.lat,
          longitude: firstOrderCords ? firstOrderCords.lng : cords.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.map}
      >
        {isTrip && firstOrderCords ? (
          orders.map((order, i) => (
            <Marker
              key={i}
              coordinate={{
                latitude: order.customer_address_id.location_lat,
                longitude: order.customer_address_id.location_lng,
              }}
              title={order.customer.name}
              onPress={() => handleMarkerPress(order.id)}
            />
          ))
        ) : (
          <Marker
            coordinate={{
              latitude: cords.lat,
              longitude: cords.lng,
            }}
          />
        )}
      </MapView>
      {isTrip && firstOrderCords && (
        <MapOverlay
          slideAnim={slideAnim}
          slideUp={slideUp}
          slideDown={slideDown}
          height={OVERLAY_HEIGHT}
          buttonHeight={OVERLAY_GRAP_HEIGHT}
          order={selectedOrder}
        />
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
