import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import Home from "../screens/admin-screens/Home";
import Orders from "../screens/admin-screens/Orders";
import Invitation from "../screens/admin-screens/Invitation";
import Header from "../components/shared/Header";
import Trips from "../screens/admin-screens/Trips";
import Map from "../screens/admin-screens/Map";
import CreateTrip from "../screens/admin-screens/CreateTrip";

const Stack = createNativeStackNavigator();

const AdminStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
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
          name="Home"
          component={Home}
          options={{ headerTitle: (props) => <Header {...props} /> }}
        />
        <Stack.Screen name="Orders" component={Orders} />
        <Stack.Screen name="Invitation" component={Invitation} />
        <Stack.Screen name="Trips" component={Trips} />
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="CreateTrip" component={CreateTrip} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AdminStack;
