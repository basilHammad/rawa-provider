import { View, Text } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../constants";
import { makeCall } from "../utils";
import { Btn } from "./Buttons";

const MapOverlayContent = ({ order }) => {
  return (
    <>
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
            Address description: {order.customer_address_id.address_description}
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
    </>
  );
};

export default MapOverlayContent;
