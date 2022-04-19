import { View, Text, Image, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";

import { useNavigation } from "@react-navigation/native";

const Order = ({
  item,
  index,
  length,
  withCheckBox,
  handleCheckboxChange,
  selectedOrdersIds,
}) => {
  const navigation = useNavigation();
  return withCheckBox ? (
    <TouchableOpacity onPress={() => handleCheckboxChange(item.id)}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          borderBottomWidth: index !== length - 1 ? 1 : 0,
          paddingBottom: 2,
          borderColor: "#eee",
          marginBottom: index !== length - 1 ? 15 : 0,
        }}
      >
        <Text style={{ marginRight: 10 }}>{index + 1} -</Text>
        <View style={{ marginRight: "auto" }}>
          <Text>{item.customer_name}</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {item.orders.map((order, i) => (
              <Text key={Math.random()} style={{ marginRight: 20 }}>
                {order.quantity} {order.item}
              </Text>
            ))}
          </View>
        </View>
        <Checkbox
          value={selectedOrdersIds.includes(item.id)}
          onValueChange={() => handleCheckboxChange(item.id)}
        />
      </View>
    </TouchableOpacity>
  ) : (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: index !== length - 1 ? 1 : 0,
        paddingBottom: 2,
        borderColor: "#eee",
        marginBottom: index !== length - 1 ? 15 : 0,
      }}
    >
      <Text style={{ marginRight: 10 }}>{index + 1} -</Text>
      <View style={{ marginRight: "auto" }}>
        <Text>{item.customer_name}</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {item.orders.map((order, i) => (
            <Text key={Math.random()} style={{ marginRight: 20 }}>
              {order.quantity} {order.item}
            </Text>
          ))}
        </View>
      </View>
      <Entypo
        name="location-pin"
        size={24}
        color="blue"
        onPress={() =>
          navigation.navigate("Map", {
            latitude: item.coordinate.latitude,
            longitude: item.coordinate.longitude,
            name: item.customer_name,
          })
        }
      />
    </View>
  );
};

export default Order;
