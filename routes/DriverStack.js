import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import Trips from "../screens/driver-screens/Trips";
import Map from "../screens/driver-screens/Map";
import Header from "../components/shared/Header";

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
        <Stack.Screen name="Map" component={Map} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default DriverStack;
