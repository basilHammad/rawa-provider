import { TextInput, Text, View } from "react-native";
import React from "react";

import { COLORS, SIZES } from "../constants";

const Input = ({ value, onChange, placeholder, style, error, isPassword }) => {
  return (
    <View
      style={{
        width: "90%",
        marginBottom: SIZES.large,
      }}
    >
      <TextInput
        style={{
          height: 40,
          borderColor: error ? COLORS.red : COLORS.gray,
          borderBottomWidth: 3,
          paddingVertical: SIZES.small,
          ...style,
        }}
        value={value}
        onChangeText={(val) => onChange(val)}
        placeholder={placeholder}
        secureTextEntry={isPassword}
      />

      <Text
        style={{
          marginBottom: SIZES.small,
          color: COLORS.red,
          opacity: error ? 1 : 0,
        }}
      >
        {error}
      </Text>
    </View>
  );
};

export default Input;
