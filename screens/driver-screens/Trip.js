import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect } from "react";
import { StyleSheet, FlatList, Text } from "react-native";
import Spinner from "react-native-loading-spinner-overlay/lib";

import Container from "../../components/Container";
import DelOrder from "../../components/DelOrder";
import { COLORS, FONTS, SIZES } from "../../constants";
import orderContext from "../../context/order/orderContext";
import useLocation from "../../hooks/useLocation";

const Trip = ({ route }) => {
  const { orders, title, tripId } = route.params;
  const location = useLocation();
  const { trip, getTripById, isLoading } = useContext(orderContext);
  const navigation = useNavigation();

  // console.log("trippppppppp", trip);

  // ! get Order by trip id here and sort them

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getTripById(tripId);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <Container style={stl.container}>
      {isLoading ? (
        <Spinner visible={isLoading} />
      ) : (
        <>
          <Text
            style={{
              fontFamily: FONTS.bold,
              fontSize: SIZES.large,
              marginTop: SIZES.large,
              textAlign: "center",
            }}
          >
            {title}
          </Text>
          <FlatList
            data={trip?.orders_ids}
            renderItem={({ item, index }) => <DelOrder item={item} />}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            // style={{ marginTop: 50 }}
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
});

export default Trip;
