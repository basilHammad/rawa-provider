import { StyleSheet, Text, FlatList } from "react-native";
import { useState, useContext, useEffect } from "react";
import Container from "../../components/Container";
import Order from "../../components/Order";
import { Btn } from "../../components/Buttons";
import orderContext from "../../context/order/orderContext";
import Spinner from "react-native-loading-spinner-overlay";
import { COLORS, SIZES } from "../../constants";

const CreateTrip = ({ navigation }) => {
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
    <Container>
      {isLoading ? (
        <Spinner visible={isLoading} />
      ) : (
        <>
          <FlatList
            data={orders}
            renderItem={({ item, index }) => (
              <Order
                item={item}
                index={index}
                length={orders.length}
                handleCheckboxChange={handleCheckboxChange}
                selectedOrdersIds={selectedOrdersIds}
                withCheckBox
              />
            )}
            keyExtractor={(item) => item.id}
            style={{ marginTop: 50 }}
          />
          <Btn style={stl.btn} onPress={() => navigation.navigate("Trips")}>
            <Text style={{ color: COLORS.white, marginRight: 5 }}>Create</Text>
          </Btn>
        </>
      )}
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
    marginTop: SIZES.large,
    borderRadius: SIZES.medium,
    position: "absolute",
    left: SIZES.large,
    right: SIZES.large,
    bottom: 50,
  },
});

export default CreateTrip;
