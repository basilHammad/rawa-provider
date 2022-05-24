import { StyleSheet, Text, FlatList, ActivityIndicator } from "react-native";
import { useState, useContext, useEffect } from "react";
import Container from "../../components/Container";
import Order from "../../components/Order";
import { Btn } from "../../components/Buttons";
import orderContext from "../../context/order/orderContext";
import Spinner from "react-native-loading-spinner-overlay";
import { COLORS, FONTS, SIZES } from "../../constants";
import Input from "../../components/Input";

const CreateTrip = ({ navigation }) => {
  const [selectedOrdersIds, setSelectedOrdersIds] = useState([]);
  const [error, setError] = useState("");
  const [name, setName] = useState("");

  const { orders, isLoading, internalLoading, getOrders, createTrip } =
    useContext(orderContext);

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

  const handleSubmit = () => {
    if (!selectedOrdersIds.length) {
      setError("please select an order");
      return;
    }
    if (!name) {
      setError("Please add a trip name");
      return;
    }

    createTrip(
      selectedOrdersIds,
      name,
      () => navigation.navigate("Trips", { isTripsUpdated: true }),
      setError
    );
  };

  return (
    <Container>
      {isLoading ? (
        <Spinner visible={isLoading} />
      ) : (
        <>
          <Input
            value={name}
            onChange={setName}
            placeholder="Trip Name"
            allowFontScaling={false}
            multiline={false}
            style={{
              height: "auto",
              borderWidth: 1,
              marginTop: SIZES.large,
            }}
          />
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
            showsVerticalScrollIndicator={false}
          />
          {error ? <Text style={stl.error}>{error}</Text> : null}
          <Btn style={stl.btn} onPress={handleSubmit}>
            {internalLoading ? (
              <ActivityIndicator color={COLORS.white} />
            ) : (
              <Text style={{ color: COLORS.white, marginRight: 5 }}>
                Create
              </Text>
            )}
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
  error: {
    position: "absolute",
    left: SIZES.large,
    right: SIZES.large,
    bottom: 120,
    textAlign: "center",
    color: COLORS.red,
    fontFamily: FONTS.bold,
    paddingHorizontal: SIZES.medium,
  },
});

export default CreateTrip;
