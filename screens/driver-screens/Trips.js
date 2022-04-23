import { FlatList, Text } from "react-native";
import React from "react";

import Container from "../../components/Container";
import Trip from "../../components/Trip";
import { FONTS, SIZES } from "../../constants";

const DUMMY_TRIP = [
  {
    id: 1,
    name: "Trip 1",
    orders_numbers: 5,
    orders: [
      {
        lat: 32.05950832767571,
        long: 35.83555055913517,
      },
      {
        lat: 32.03952236482943,
        long: 35.833279663981834,
      },
      {
        lat: 32.02156130176124,
        long: 35.8432504386772,
      },
    ],
  },
  {
    id: 2,
    name: "Trip 2",
    orders_numbers: 3,
    orders: [
      {
        lat: 32.05950832767571,
        long: 35.83555055913517,
      },
      {
        lat: 32.03952236482943,
        long: 35.833279663981834,
      },
      {
        lat: 32.02156130176124,
        long: 35.8432504386772,
      },
    ],
  },
  {
    id: 3,
    name: "Trip 3",
    orders_numbers: 5,
    orders: [
      {
        lat: 32.05950832767571,
        long: 35.83555055913517,
      },
      {
        lat: 32.03952236482943,
        long: 35.833279663981834,
      },
      {
        lat: 32.02156130176124,
        long: 35.8432504386772,
      },
    ],
  },
  {
    id: 4,
    name: "Trip 4",
    orders_numbers: 5,
    orders: [
      {
        lat: 32.05950832767571,
        long: 35.83555055913517,
      },
      {
        lat: 32.03952236482943,
        long: 35.833279663981834,
      },
      {
        lat: 32.02156130176124,
        long: 35.8432504386772,
      },
    ],
  },
  {
    id: 5,
    name: "Trip 5",
    orders_numbers: 5,
    orders: [
      {
        lat: 32.05950832767571,
        long: 35.83555055913517,
      },
      {
        lat: 32.03952236482943,
        long: 35.833279663981834,
      },
      {
        lat: 32.02156130176124,
        long: 35.8432504386772,
      },
    ],
  },
];

const Trips = () => {
  return (
    <Container>
      <Text>Driver</Text>
    </Container>
  );
};

export default Trips;
