import { View, Text, Image, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";

import { useNavigation } from "@react-navigation/native";
import { COLORS, FONTS, SIZES } from "../constants";

const Order = ({ item, index, length }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        // alignItems: "center",
        borderBottomWidth: index !== length - 1 ? 1 : 0,
        paddingBottom: 2,
        borderColor: "#eee",
        marginBottom: index !== length - 1 ? SIZES.medium : 0,
      }}
    >
      <Text
        style={{
          marginRight: SIZES.small,
          fontSize: SIZES.medium,
          fontFamily: FONTS.bold,
        }}
      >
        {index + 1} -
      </Text>
      <View style={{ marginRight: "auto" }}>
        <Text
          style={{
            fontFamily: FONTS.bold,
            fontSize: SIZES.medium,
          }}
        >
          {item.customer.name}
        </Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            paddingVertical: SIZES.base,
          }}
        >
          {item.order_products.map((order, i) => (
            <Text
              key={Math.random()}
              style={{
                color: COLORS.textGray,
                marginRight: SIZES.large,
                marginBottom: SIZES.base,
              }}
            >
              {order.qty} {order.product_name}
            </Text>
          ))}
        </View>
      </View>
      <Entypo
        name="location-pin"
        size={SIZES.extraLarge}
        color="blue"
        onPress={() =>
          navigation.navigate("CustomerAddress", {
            cords: {
              lat: item.customer_address_id.location_lat,
              lng: item.customer_address_id.location_lng,
            },
            name: item.customer.name,
            title: item.customer.name,
          })
        }
      />
    </View>
  );
};

export default Order;
