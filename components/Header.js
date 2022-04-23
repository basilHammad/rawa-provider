import React from "react";
import { View, Image, Text } from "react-native";

import Logo from "../assets/rawa.png";
import { SIZES } from "../constants";

const LogoTitle = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Image
        style={{ width: 50, height: 50, marginRight: SIZES.small }}
        source={Logo}
      />
      <Text style={{ fontFamily: "robotoBold", fontSize: SIZES.large }}>
        Rawa
      </Text>
    </View>
  );
};

export default LogoTitle;
