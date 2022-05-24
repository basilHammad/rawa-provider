import { useState, useContext, useEffect } from "react";
import { Text, StyleSheet, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Spinner from "react-native-loading-spinner-overlay";

import Container from "../../components/Container";
import Trip from "../../components/Trip";
import { Btn } from "../../components/Buttons";
import { COLORS, FONTS, SIZES } from "../../constants";
import orderContext from "../../context/order/orderContext";
import AssignDriverModal from "../../components/AssignDriverModal";

const Trips = ({ navigation, route }) => {
  const [note, setNote] = useState("");
  const [modal, setModal] = useState({
    isShown: false,
    selectidTripId: null,
    shouldFetchTrips: false,
    selectedDriver: null,
  });

  const { isLoading, internalLoading, trips, drivers, getTrips, assignDriver } =
    useContext(orderContext);

  useEffect(() => {
    if (!trips.length || route.params?.isTripsUpdated || modal.shouldFetchTrips)
      getTrips();

    if (modal.shouldFetchTrips)
      setModal((prev) => ({ ...prev, shouldFetchTrips: false }));
  }, [modal.shouldFetchTrips, route.params]);

  return (
    <Container style={stl.container}>
      {isLoading ? (
        <Spinner visible={isLoading} />
      ) : (
        <>
          <Btn
            style={stl.btn}
            onPress={() => navigation.navigate("CreateTrip")}
          >
            <Ionicons name="add" size={SIZES.extraLarge} color="#333" />
            <Text
              style={{
                color: "#333",
                fontFamily: FONTS.bold,
                fontSize: SIZES.large,
                marginRight: 5,
              }}
            >
              Create Trip
            </Text>
          </Btn>
          <FlatList
            data={trips}
            renderItem={({ item, index }) => (
              <Trip
                item={item}
                index={index}
                length={trips.length}
                setModal={setModal}
              />
            )}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
          <AssignDriverModal
            modal={modal}
            setModal={setModal}
            note={note}
            setNote={setNote}
            assignDriver={assignDriver}
            loading={internalLoading}
            drivers={drivers}
          />
        </>
      )}
    </Container>
  );
};

const stl = StyleSheet.create({
  container: {
    backgroundColor: COLORS.gray,
  },
  btn: {
    flexDirection: "row",
    backgroundColor: COLORS.yellow,
    justifyContent: "center",
    alignItems: "center",
    padding: SIZES.medium,
    marginVertical: SIZES.large,
    borderRadius: SIZES.medium,
  },
  modal: {
    marginHorizontal: 20,
  },
});

export default Trips;
