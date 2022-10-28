import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import Trips from "../screens/driver-screens/Trips";
import Map from "../screens/driver-screens/Map";
import Header from "../components/Header";
import TripOrders from "../screens/driver-screens/TripOrders";
import CustomerAddressMap from "../screens/driver-screens/CustomerAddressMap";
import OrdersList from "../screens/driver-screens/OrdersList";
import { SIZES } from "../constants";

const Stack = createNativeStackNavigator();

const DriverStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Trips"
        screenOptions={{
          headerStyle: {
            borderBottomWidth: 0,
            elevation: 0,
          },
          // headerBackImageSource: backIcon,
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="Trips"
          component={Trips}
          options={{ headerTitle: (props) => <Header {...props} /> }}
        />
        <Stack.Screen
          name="Map"
          component={Map}
          options={({ route }) => ({ title: route.params.title })}
        />
        <Stack.Screen name="Orders" component={TripOrders} />
        <Stack.Screen name="CustomerAddress" component={CustomerAddressMap} />
        <Stack.Screen name="OrdersList" component={OrdersList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default DriverStack;
