import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";

import img from "../../assets/favicon.png";
import Container from "../../components/Container";
import { Btn, BtnWithBackground } from "../../components/Buttons";
import userContext from "../../context/user/userContext";
import Login from "../Login";
import { COLORS, SIZES } from "../../constants";

const Home = ({ navigation }) => {
  const { isLoggedin, setIsLoggedin } = useContext(userContext);
  if (!isLoggedin) return <Login />;
  return (
    <Container style={stl.container}>
      {/* <Btn
        style={{
          backgroundColor: COLORS.yellow,
          width: "100%",
          justifyContet: "center",
          alignItems: "center",
          padding: SIZES.small,
          borderRadius: SIZES.medium,
          minHeight: 50,
          // marginTop: iskeyboardOpen ? 0 : "auto",
          marginBottom: SIZES.large * 2,
        }}
        onPress={() => setIsLoggedin(false)}
      >
        <Text>logout</Text>
      </Btn> */}
      <View style={{ flexDirection: "row", marginBottom: SIZES.medium }}>
        <View style={{ flexGrow: 1, marginRight: SIZES.base, minHeight: 136 }}>
          <BtnWithBackground
            backgroundColor={COLORS.darkBlue}
            img={img}
            text="My Orders"
            onPress={() => navigation.navigate("Orders")}
          />
        </View>
        <View style={{ flexGrow: 1, minHeight: 130 }}>
          <BtnWithBackground
            backgroundColor={COLORS.darkBlue}
            img={img}
            text="Invitation"
            onPress={() => navigation.navigate("Invitation")}
          />
        </View>
      </View>
      <View style={{ width: "100%", minHeight: 90 }}>
        <BtnWithBackground
          backgroundColor={COLORS.darkBlue}
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
    backgroundColor: COLORS.white,
  },
});

export default Home;
