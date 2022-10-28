import React, { useContext } from "react";
import { View, Image, Text } from "react-native";

import Logo from "../assets/logo.svg";
import { COLORS, FONTS, SIZES } from "../constants";
import userContext from "../context/user/userContext";
import { Btn } from "./Buttons";

const LogoTitle = () => {
  const { setIsLoggedin } = useContext(userContext);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        flex: 1,
        paddingHorizontal: SIZES.medium,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={{ marginRight: SIZES.small }}>
          <Logo width={40} height={40} />
        </View>
        <Text style={{ fontFamily: "robotoBold", fontSize: SIZES.large }}>
          Rawa
        </Text>
      </View>
      <Btn
        style={{
          marginRight: SIZES.extraLarge,
        }}
        onPress={() => setIsLoggedin(false)}
      >
        <Text
          style={{
            fontSize: SIZES.large,
            fontFamily: FONTS.semiBold,
            color: COLORS.blue,
          }}
        >
          logout
        </Text>
      </Btn>
    </View>
  );
};

export default LogoTitle;
