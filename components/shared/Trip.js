import { View, Text } from "react-native";
import React, { useState } from "react";
import { Link } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { COLORS, SIZES } from "../../constants";

const Trip = ({ isDriver, item, index, length }) => {
  const [selectedDriver, setSelectedDriver] = useState();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: index !== length - 1 ? SIZES.large : 0,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          flexGrow: 1,
          marginRight: SIZES.extraLarge,
          paddingRight: SIZES.medium,
        }}
      >
        <Text>{item.name}</Text>
        <Text>{item.orders_numbers}</Text>
      </View>
      <View
        style={{
          flexGrow: isDriver ? 0 : 1,
          flexDirection: isDriver ? "row" : "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {isDriver ? (
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
          <Picker
            selectedValue={selectedDriver}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedDriver(itemValue)
            }
            style={{ width: "100%" }}
            mode="dropdown"
          >
            <Picker.Item label="driver 1" value="driver 1" />
            <Picker.Item label="driver 2" value="driver 2" />
          </Picker>
        )}
      </View>
    </View>
  );
};

export default Trip;
