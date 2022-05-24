import { View, Text, Animated } from "react-native";

import { Btn } from "./Buttons";

import GestureRecognizer from "react-native-swipe-gestures";
import { COLORS, SIZES } from "../constants";
import { makeCall } from "../utils";

const config = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80,
};

const MapOverlay = ({
  style,
  slideAnim,
  height,
  buttonHeight,
  order,
  slideUp,
  slideDown,
}) => {
  return (
    <Animated.View
      style={{
        ...style,
        justifyContent: "center",
        alignItems: "center",
        minHeight: height,
        position: "absolute",
        width: "100%",
        bottom: 0,

        transform: [{ translateY: slideAnim }],
      }}
    >
      <GestureRecognizer
        onSwipeUp={slideUp}
        onSwipeDown={slideDown}
        config={config}
        style={{
          flex: 1,
          backgroundColor: COLORS.gray,
          width: "100%",
          minHeight: 50,
          borderTopRightRadius: 7.5,
          borderTopLeftRadius: 7.5,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            backgroundColor: "#c7c8c9",
            width: "100%",
            height: buttonHeight,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 100,
              height: 5,
              backgroundColor: "black",
              borderRadius: 5,
            }}
          ></View>
        </View>
        <View style={{ padding: SIZES.medium }}>
          <View style={{ borderBottomWidth: 1 }}>
            <Text style={{ marginBottom: SIZES.base }}>
              Customer name: {order.customer.name}
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ flexDirection: "row", marginBottom: SIZES.base }}>
                <Text>Mobile number: </Text>
                <Btn onPress={() => makeCall(order.customer.mobile_number)}>
                  <Text style={{ color: COLORS.blue }}>
                    {order.customer.mobile_number}
                  </Text>
                </Btn>
              </View>
              <Text>{order.order_delivery_date}</Text>
            </View>
            <Text style={{ marginBottom: SIZES.base }}>
              Address: {order.customer_address_id.address_name}
            </Text>
            <Text style={{ marginBottom: SIZES.base }}>
              Address description:{" "}
              {order.customer_address_id.address_description}
            </Text>
            <Text style={{ marginBottom: SIZES.base }}>Note: {order.note}</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              marginTop: SIZES.base,
              marginBottom: SIZES.base,
            }}
          >
            {order.order_products.map((product, i) => (
              <View
                key={i}
                style={{ flexDirection: "row", marginRight: SIZES.base }}
              >
                <Text> {product.product_name}</Text>
                <Text> {product.qty}</Text>
              </View>
            ))}
          </View>

          <Text style={{ color: COLORS.red }}>Price: {order.total_price}</Text>
        </View>
      </GestureRecognizer>
    </Animated.View>
  );
};

export default MapOverlay;
