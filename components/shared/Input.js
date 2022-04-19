import { TextInput, Text, View } from "react-native";
import React from "react";

import { COLORS, SIZES } from "../../constants";

const Input = ({ value, onChange, placeholder, style, error }) => {
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
          borderBottomWidth: 4,
          paddingVertical: SIZES.small,
          ...style,
        }}
        value={value}
        onChangeText={(val) => onChange(val)}
        placeholder={placeholder}
      />
      {error ? (
        <Text style={{ marginVertical: SIZES.small, color: COLORS.red }}>
          {error}
        </Text>
      ) : null}
    </View>
  );
};

export default Input;
