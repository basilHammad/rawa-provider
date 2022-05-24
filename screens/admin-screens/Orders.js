import { Text, StyleSheet, FlatList } from "react-native";
import { useState, useEffect, useContext } from "react";
import Container from "../../components/Container";
import Order from "../../components/Order";
import orderContext from "../../context/order/orderContext";
import Spinner from "react-native-loading-spinner-overlay";

const Orders = () => {
  const [selectedOrdersIds, setSelectedOrdersIds] = useState([]);
  const { orders, isLoading, getOrders } = useContext(orderContext);

  useEffect(() => {
    if (orders.length) return;

    getOrders();
  }, []);

  const handleCheckboxChange = (id) => {
    if (selectedOrdersIds.includes(id)) {
      setSelectedOrdersIds((preIds) => preIds.filter((preId) => preId !== id));
    } else {
      setSelectedOrdersIds((preIds) => [...preIds, id]);
    }
  };

  return (
    <Container style={stl.container}>
      {isLoading ? (
        <Spinner visible={isLoading} />
      ) : (
        <FlatList
          data={orders}
          renderItem={({ item, index }) => (
            <Order
              item={item}
              index={index}
              length={orders.length}
              handleCheckboxChange={handleCheckboxChange}
              selectedOrdersIds={selectedOrdersIds}
              showsVerticalScrollIndicator={false}
            />
          )}
          keyExtractor={(item) => item.id}
          style={{ marginTop: 50 }}
        />
      )}
    </Container>
  );
};

const stl = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
});

export default Orders;
