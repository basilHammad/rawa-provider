import { View, Text } from "react-native";
import React, { useState } from "react";
import { Link } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { COLORS, FONTS, SHADOWS, SIZES } from "../constants";
import { Btn } from "./Buttons";

const Trip = ({ isDriver, item, index, length, setModal }) => {
  const hanldeOpenModal = (id) => {
    setModal((prev) => ({
      ...prev,
      isShown: true,
      selectidTripId: id,
    }));
  };

  return (
    <View
      style={{
        paddingTop: SIZES.medium,
        marginBottom: SIZES.base,
        borderWidth: 1,
        borderRadius: 7,
        borderColor: "#D4D4D4",
        backgroundColor: COLORS.white,
        ...SHADOWS.medium,
      }}
    >
      <Text
        style={{
          fontSize: SIZES.large,
          fontFamily: FONTS.semiBold,
          marginBottom: SIZES.base,
          paddingHorizontal: SIZES.medium,
        }}
      >
        {item.trip_name}
      </Text>
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: SIZES.medium,
          marginBottom: SIZES.small,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ marginBottom: SIZES.base, color: "gray" }}>
            {item.trip_delivery_date}
          </Text>
          <Text>
            Total Price:{" "}
            <Text style={{ fontFamily: FONTS.semiBold }}>
              {item.total_price}
            </Text>
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ color: COLORS.green, marginBottom: SIZES.base }}>
            Orders: {item.orders_ids.length}
          </Text>
          <Text>
            Driver:{" "}
            <Text style={{ fontFamily: FONTS.semiBold }}>
              {item.driver_name ? item.driver_name : "no drivers"}
            </Text>
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          borderTopWidth: 1,
          borderColor: COLORS.gray,
        }}
      >
        <Link
          style={{
            paddingHorizontal: SIZES.medium,
            paddingVertical: SIZES.small,
            color: COLORS.blue,
            flex: 1,
            textAlign: "center",
            borderRightWidth: 1,
            borderColor: COLORS.gray,
          }}
          to={{
            screen: "Map",
            params: {
              orders: item.orders_ids,
              title: item.trip_name,
              isTrip: true,
            },
          }}
        >
          View
        </Link>

        <Btn
          style={{
            paddingHorizontal: SIZES.medium,
            paddingVertical: SIZES.small,
            flex: 1,
          }}
          onPress={() => hanldeOpenModal(item.id)}
          disabled={item.driver_id ? true : false}
        >
          <Text
            style={{
              color: item.driver_id ? "gray" : COLORS.blue,
              textAlign: "center",
            }}
          >
            Assign
          </Text>
        </Btn>

        {/* {isDriver ? (
          <>
            <Link
              style={{
                backgroundColor: COLORS.blue,
                paddingHorizontal: SIZES.medium,
                paddingVertical: SIZES.small,
                marginRight: SIZES.extraLarge,
                color: COLORS.white,
                borderRadius: 5,
              }}
              to={{ screen: "Map", params: { coordinates: item.orders } }}
            >
              View
            </Link>
            <Link
              style={{
                backgroundColor: COLORS.green,
                paddingHorizontal: SIZES.medium,
                paddingVertical: SIZES.small,
                color: COLORS.white,
                borderRadius: 5,
              }}
              to={{ screen: "TripMap" }}
            >
              Start
            </Link>
          </>
        ) : (
          <Btn
            style={{
              backgroundColor: item.driver_id ? COLORS.red : COLORS.green,
              paddingHorizontal: SIZES.medium,
              paddingVertical: SIZES.small,
              color: COLORS.white,
              borderRadius: 5,
              flex: 1,
            }}
            onPress={() => hanldeOpenModal(item.id)}
            disabled={item.driver_id ? true : false}
          >
            <Text style={{ color: COLORS.white }}>Assign</Text>
          </Btn>
        )} */}
      </View>
    </View>
  );
};

export default Trip;
