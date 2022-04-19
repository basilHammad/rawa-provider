import { Text, StyleSheet, FlatList } from "react-native";
import { useState } from "react";
import Container from "../components/shared/Container";
import Order from "../components/shared/Order";

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

const Orders = () => {
  const [selectedOrdersIds, setSelectedOrdersIds] = useState([]);

  const handleCheckboxChange = (id) => {
    if (selectedOrdersIds.includes(id)) {
      setSelectedOrdersIds((preIds) => preIds.filter((preId) => preId !== id));
    } else {
      setSelectedOrdersIds((preIds) => [...preIds, id]);
    }
  };

  return (
    <Container style={stl.container}>
      <Text
        style={{
          marginTop: 50,
          marginBottom: 30,
          fontSize: 24,
          color: "gray",
        }}
      >
        Today
      </Text>
      <FlatList
        data={Dummy_order}
        renderItem={({ item, index }) => (
          <Order
            item={item}
            index={index}
            length={Dummy_order.length}
            handleCheckboxChange={handleCheckboxChange}
            selectedOrdersIds={selectedOrdersIds}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </Container>
  );
};

const stl = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
});

export default Orders;
