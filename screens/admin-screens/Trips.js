import { Text, StyleSheet, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Container from "../../components/Container";
import Trip from "../../components/Trip";
import { Btn } from "../../components/Buttons";
import { COLORS, SIZES } from "../../constants";

const DUMMY_TRIP = [
  { id: 1, name: "Trip 1", orders_numbers: 5 },
  { id: 2, name: "Trip 2", orders_numbers: 3 },
  { id: 3, name: "Trip 3", orders_numbers: 5 },
  { id: 4, name: "Trip 4", orders_numbers: 5 },
  { id: 5, name: "Trip 5", orders_numbers: 5 },
];

const Trips = ({ navigation }) => {
  return (
    <Container>
      <Btn style={stl.btn} onPress={() => navigation.navigate("CreateTrip")}>
        <Text style={{ color: COLORS.white, marginRight: 5 }}>Create Trip</Text>
        <Ionicons name="add" size={SIZES.extraLarge} color="white" />
      </Btn>
      <FlatList
        data={DUMMY_TRIP}
        renderItem={({ item, index }) => (
          <Trip item={item} index={index} length={DUMMY_TRIP.length} />
        )}
        keyExtractor={(item) => item.id}
      />
    </Container>
  );
};

const stl = StyleSheet.create({
  btn: {
    flexDirection: "row",
    backgroundColor: COLORS.darkBlue,
    justifyContent: "center",
    alignItems: "center",
    padding: SIZES.medium,
    marginVertical: SIZES.large,
    borderRadius: SIZES.medium,
  },
});

export default Trips;
