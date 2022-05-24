import React from "react";
import { View, Image, Text } from "react-native";

import Logo from "../assets/logo.svg";
import { SIZES } from "../constants";

const LogoTitle = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <View style={{ marginRight: SIZES.small }}>
        <Logo width={50} height={50} />
      </View>
      <Text style={{ fontFamily: "robotoBold", fontSize: SIZES.large }}>
        Rawa
      </Text>
    </View>
  );
};

export default LogoTitle;
