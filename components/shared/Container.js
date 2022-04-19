import React from "react";

import { StyleSheet, SafeAreaView } from "react-native";

const Container = ({ children, style }) => {
  return (
    <SafeAreaView style={{ ...style, ...stl.container }}>
      {children}
    </SafeAreaView>
  );
};

const stl = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
});

export default Container;
