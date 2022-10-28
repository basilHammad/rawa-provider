import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { COLORS, FONTS, SHADOWS, SIZES } from "../constants";
import OpenMapBtn from "./OpenMapBtn";

const DelOrder = ({ item, index, length }) => {
  return (
    <View
      style={{
        justifyContent: "space-between",
        marginBottom: index !== length - 1 ? SIZES.medium : 0,
        paddingTop: SIZES.medium,
        borderWidth: 1,
        borderRadius: 7,
        borderColor: "#D4D4D4",
        backgroundColor: COLORS.white,
        ...SHADOWS.medium,
      }}
    >
      <View
        style={{
          flex: 1,
          marginBottom: SIZES.medium,
          paddingHorizontal: SIZES.medium,
        }}
      >
        <Text
          style={{
            fontFamily: FONTS.bold,
            fontSize: SIZES.font,
            marginBottom: SIZES.base,
            color: COLORS.green,
          }}
        >
          اسم العميل :{" "}
          <Text
            style={{
              fontFamily: FONTS.bold,
              fontSize: SIZES.medium,
              color: "#333",
            }}
          >
            {item.full_name}
          </Text>
        </Text>
        <Text
          style={{
            fontFamily: FONTS.bold,
            fontSize: SIZES.font,
            color: COLORS.red,
          }}
        >
          رقم الهاتف :{" "}
          <Text
            style={{
              fontFamily: FONTS.bold,
              fontSize: SIZES.medium,
              color: "#333",
            }}
          >
            {item.phone_number}
          </Text>
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          marginBottom: SIZES.medium,
          paddingHorizontal: SIZES.medium,
        }}
      >
        {item.note ? (
          <>
            <Text
              style={{
                fontFamily: FONTS.bold,
                fontSize: SIZES.medium,
                marginBottom: SIZES.base,
              }}
            >
              ملاحظات :{" "}
            </Text>
            <Text
              style={{
                fontFamily: FONTS.bold,
                fontSize: SIZES.small,
              }}
            >
              {item.note}
            </Text>
          </>
        ) : null}
      </View>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          paddingHorizontal: SIZES.medium,
          marginBottom: SIZES.base,
        }}
      >
        {item?.order_products?.map((order, i) => (
          <Text
            key={Math.random()}
            style={{
              color: COLORS.textGray,
              marginRight: SIZES.large,
              marginBottom: SIZES.base,
            }}
          >
            {order.qty} {order.product_name}
          </Text>
        ))}
      </View>

      <OpenMapBtn order={item} />
    </View>
  );
};

export default DelOrder;
