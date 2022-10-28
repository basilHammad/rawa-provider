import { useState, useContext, useEffect } from "react";
import { Text, StyleSheet, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Spinner from "react-native-loading-spinner-overlay";

import Container from "../../components/Container";
import Trip from "../../components/Trip";
import { Btn } from "../../components/Buttons";
import { COLORS, FONTS, SIZES } from "../../constants";
import orderContext from "../../context/order/orderContext";
import userContext from "../../context/user/userContext";

import AssignDriverModal from "../../components/AssignDriverModal";
import useLocation from "../../hooks/useLocation";

const Trips = ({ navigation, route }) => {
  const [note, setNote] = useState("");
  const [modal, setModal] = useState({
    isShown: false,
    selectidTripId: null,
    shouldFetchTrips: false,
    selectedDriver: null,
  });

  const { location } = useLocation();

  const { setIsLoggedin } = useContext(userContext);
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
      {/* <Btn
        style={{
          backgroundColor: COLORS.yellow,
          width: "100%",
          justifyContet: "center",
          alignItems: "center",
          padding: SIZES.small,
          borderRadius: SIZES.medium,
          minHeight: 50,
          // marginTop: iskeyboardOpen ? 0 : "auto",
          marginBottom: SIZES.large * 2,
        }}
        onPress={() => setIsLoggedin(false)}
      >
        <Text>logout</Text>
      </Btn> */}
      {isLoading ? (
        <Spinner visible={isLoading} />
      ) : (
        <>
          <Text
            style={{
              fontFamily: FONTS.bold,
              fontSize: SIZES.large,
              marginVertical: SIZES.large,
            }}
          >
            Trips
          </Text>
          <FlatList
            data={trips}
            renderItem={({ item, index }) => (
              <Trip
                item={item}
                index={index}
                length={trips.length}
                setModal={setModal}
                location={location}
                isDriver
              />
            )}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
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

// import React, { Component, useEffect, useState } from "react";
// import { View, Text, Platform, Alert } from "react-native";
// import {
//   Accuracy,
//   requestForegroundPermissionsAsync,
//   watchPositionAsync,
// } from "expo-location";

// const LocationTest = () => {
//   const [location, setLocation] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     let subscriber;

//     const startWatching = async () => {
//       try {
//         const { status } = await requestPermissionsAsync();
//         const subscriber = await watchPositionAsync(
//           {
//             accuracy: Accuracy.BestForNavigation,
//             timeInterval: 1000,
//             distanceInterval: 10,
//           },
//           (pos) => {
//             console.log(pos);
//           }
//         );

//         if (status !== "granted") {
//           throw new Error("Location permission not granted");
//         }
//       } catch (err) {
//         setError(err);
//       }
//     };

// if (shouldTrack) {
// startWatching();
// } else {
//   subscriber?.remove();
//   subscriber = null;
// }

//     return () => {
//       if (subscriber) {
//         subscriber.remove();
//       }
//     };
//   }, []);

//   useEffect(() => {
//     console.log(location);
//   }, [location]);

//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>{"location"}</Text>
//     </View>
//   );
// };

// export default LocationTest;
