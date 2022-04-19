import React from "react";
import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native";
import { Btn } from "../components/shared/Buttons";
import { COLORS, FONTS, SIZES } from "../constants";
import { copyToClipboard } from "../utils";

const Invitation = () => {
  const link = "https://www.rawa.com";

  const handleInvite = () => {};
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          backgroundColor: COLORS.gray,
          width: "100%",
          minHeight: 150,
          justifyContent: "center",
          paddingHorizontal: SIZES.small,
          marginBottom: SIZES.medium,
          marginTop: "auto",
        }}
      >
        <View
          style={{
            backgroundColor: COLORS.white,
            minHeight: 60,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: SIZES.small,
            borderRadius: SIZES.small,
          }}
        >
          <Text>{link}</Text>
          <Btn
            style={{
              justifyContet: "center",
              alignItems: "center",
              padding: SIZES.small,
            }}
            onPress={() => copyToClipboard(link)}
          >
            <Text style={{ fontFamily: FONTS.bold, color: COLORS.blue }}>
              Copy
            </Text>
          </Btn>
        </View>
      </View>
      <Btn
        style={{
          flexDirection: "row",
          backgroundColor: COLORS.yellow,
          width: "90%",
          justifyContet: "center",
          alignItems: "center",
          padding: SIZES.small,
          borderRadius: SIZES.medium,
          marginBottom: SIZES.extraLarge * 2,
          minHeight: 50,
        }}
        onPress={handleInvite}
      >
        <Text
          style={{
            fontFamily: FONTS.regular,
            width: "100%",
            textAlign: "center",
          }}
        >
          Invite
        </Text>
      </Btn>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});

export default Invitation;
