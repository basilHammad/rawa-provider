import { StyleSheet, SafeAreaView } from "react-native";

import { COLORS, SIZES } from "../constants";

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
    paddingHorizontal: SIZES.large,
    backgroundColor: COLORS.white,
  },
});

export default Container;
