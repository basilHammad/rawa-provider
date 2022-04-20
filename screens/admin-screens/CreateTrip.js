import { StyleSheet, Text, FlatList } from "react-native";
import React, { useState } from "react";
import Container from "../../components/shared/Container";
import Order from "../../components/shared/Order";
import { Btn } from "../../components/shared/Buttons";

const Dummy_order = [
  {
    id: 1,
    customer_name: "customer 1",
    orders: [
      { item: "bottel", quantity: "5" },
      { item: "cobon", quantity: "2" },
    ],
    coordinate: {
      latitude: 32.02200775669563,
      longitude: 35.843985201561225,
    },
  },
  {
    id: 2,
    customer_name: "customer 2",
    orders: [
      { item: "bottel", quantity: "5" },
      { item: "cobon", quantity: "2" },
    ],
    coordinate: {
      latitude: 32.02200775669563,
      longitude: 35.843985201561225,
    },
  },
  {
    id: 3,
    customer_name: "customer 3",
    orders: [
      { item: "bottel", quantity: "5" },
      { item: "cobon", quantity: "2" },
    ],
    coordinate: {
      latitude: 32.02200775669563,
      longitude: 35.843985201561225,
    },
  },
  {
    id: 4,
    customer_name: "customer 4",
    orders: [
      { item: "bottel", quantity: "5" },
      { item: "cobon", quantity: "2" },
    ],
    coordinate: {
      latitude: 32.02200775669563,
      longitude: 35.843985201561225,
    },
  },
];

const CreateTrip = ({ navigation }) => {
  const [selectedOrdersIds, setSelectedOrdersIds] = useState([]);

  const handleCheckboxChange = (id) => {
    if (selectedOrdersIds.includes(id)) {
      setSelectedOrdersIds((preIds) => preIds.filter((preId) => preId !== id));
    } else {
      setSelectedOrdersIds((preIds) => [...preIds, id]);
    }
  };

  return (
    <Container>
      <FlatList
        data={Dummy_order}
        renderItem={({ item, index }) => (
          <Order
            item={item}
            index={index}
            length={Dummy_order.length}
            handleCheckboxChange={handleCheckboxChange}
            selectedOrdersIds={selectedOrdersIds}
            withCheckBox
          />
        )}
        keyExtractor={(item) => item.id}
        style={{ marginTop: 50 }}
      />

      <Btn style={stl.btn} onPress={() => navigation.navigate("Trips")}>
        <Text style={{ color: "#fff", marginRight: 5 }}>Create</Text>
      </Btn>
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
    marginTop: 20,
    borderRadius: 15,
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 50,
  },
});

export default CreateTrip;
