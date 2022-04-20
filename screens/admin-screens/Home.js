import React from "react";
import { StyleSheet, View } from "react-native";

import img from "../../assets/favicon.png";
import Container from "../../components/shared/Container";
import { BtnWithBackground } from "../../components/shared/Buttons";

const Home = ({ navigation }) => {
  const gap = 5;
  return (
    <Container style={stl.container}>
      <View style={{ flexDirection: "row", marginBottom: gap }}>
        <View style={{ flexGrow: 1, marginRight: gap, minHeight: 130 }}>
          <BtnWithBackground
            backgroundColor={"#44368d"}
            img={img}
            text="My Orders"
            onPress={() => navigation.navigate("Orders")}
            subText={500}
          />
        </View>
        <View style={{ flexGrow: 1, minHeight: 130 }}>
          <BtnWithBackground
            backgroundColor={"#44368d"}
            img={img}
            text="Invitation"
            onPress={() => navigation.navigate("Invitation")}
          />
        </View>
      </View>
      <View style={{ width: "100%", minHeight: 80 }}>
        <BtnWithBackground
          backgroundColor={"#44368d"}
          img={img}
          text="Trips"
          onPress={() => navigation.navigate("Trips")}
        />
      </View>
    </Container>
  );
};

const stl = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

export default Home;
