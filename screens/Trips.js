import { Text, StyleSheet, FlatList } from "react-native";
import React from "react";

import Container from "../components/shared/Container";
import Trip from "../components/shared/Trip";
import { Ionicons } from "@expo/vector-icons";
import { Btn } from "../components/shared/Buttons";

const DUMMY_TRIP = [
  { id: 1, name: "Trip 1", orders_numbers: 5 },
  { id: 2, name: "Trip 2", orders_numbers: 3 },
  { id: 3, name: "Trip 3", orders_numbers: 5 },
  { id: 4, name: "Trip 4", orders_numbers: 5 },
  { id: 5, name: "Trip 5", orders_numbers: 5 },
];

const Trips = ({ navigation }) => {
  return (
    <Container style={stl.container}>
      <Btn style={stl.btn} onPress={() => navigation.navigate("CreateTrip")}>
        <Text style={{ color: "#fff", marginRight: 5 }}>Create Trip</Text>
        <Ionicons name="add" size={24} color="white" />
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
    backgroundColor: "#44368d",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    marginVertical: 20,
    borderRadius: 15,
  },
});

export default Trips;
