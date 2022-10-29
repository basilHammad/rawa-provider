import { Text, StyleSheet, FlatList } from "react-native";
import { useState, useEffect, useContext } from "react";
import Container from "../../components/Container";
import Order from "../../components/Order";
import Spinner from "react-native-loading-spinner-overlay";
import TripOrder from "../../components/TripOrder";
import { FONTS, SIZES } from "../../constants";

const Orders = ({ route }) => {
  const { orders } = route.params;

  return (
    <Container style={stl.container}>
      <Text
        style={{
          fontFamily: FONTS.bold,
          fontSize: SIZES.extraLarge,
          marginTop: SIZES.large,
          textAlign: "center",
        }}
      >
        الطلبات
      </Text>

      <FlatList
        data={orders}
        renderItem={({ item, index }) => (
          <TripOrder
            item={item}
            index={index}
            length={orders.length}
            handleCheckboxChange={null}
            selectedOrdersIds={null}
          />
        )}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        style={{ marginTop: 50 }}
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
