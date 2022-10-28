import { View, Text, FlatList } from "react-native";
import React from "react";
import Container from "../../components/Container";
import { FONTS, SIZES } from "../../constants";
import ProductCard from "../../components/ProductCard";

const OrdersList = ({ route }) => {
  const { products, customerName } = route.params;

  return (
    <Container>
      <Text
        style={{
          fontSize: SIZES.large,
          fontFamily: FONTS.bold,
          textAlign: "center",
          paddingTop: SIZES.extraLarge * 2,
          paddingBottom: SIZES.extraLarge * 2,
        }}
      >
        {customerName}
      </Text>

      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard item={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};

export default OrdersList;