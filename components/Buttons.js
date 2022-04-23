import React from "react";
import { Text, Pressable, ImageBackground } from "react-native";
import { COLORS, SIZES } from "../constants";

export const BtnWithBackground = ({
  backgroundColor,
  img,
  text,
  onPress,
  subText,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: backgroundColor,
        flex: 1,
        padding: SIZES.small,
        borderRadius: SIZES.medium,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <ImageBackground
        source={img}
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      > */}
      <Text
        style={{
          color: COLORS.white,
          fontFamily: "robotoBold",
        }}
      >
        {text}
      </Text>
      {subText && (
        <Text
          style={{
            color: COLORS.white,
            position: "absolute",
            bottom: SIZES.small,
            textAlign: "center",
            width: "100%",
          }}
        >
          {subText}
        </Text>
      )}

      {/* </ImageBackground> */}
    </Pressable>
  );
};

export const Btn = ({ style, children, onPress }) => (
  <Pressable onPress={onPress} style={style}>
    {children}
  </Pressable>
);
