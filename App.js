import PrepareApp from "./PrepareApp";
import UserState from "./context/user/userState";
import OrderState from "./context/order/orderState";
import PubNub from "pubnub";
import { PubNubProvider } from "pubnub-react";
import { I18nManager } from "react-native";

const pubnub = new PubNub({
  publishKey: "pub-c-4b2e0ecf-f13a-4e2c-b574-43458fbd40a7",
  subscribeKey: "sub-c-7d878e83-a128-4dc1-8525-52f8f33e00f3",
});

export default function App() {
  I18nManager.forceRTL(false);
  I18nManager.allowRTL(false);

  return (
    <PubNubProvider client={pubnub}>
      <UserState>
        <OrderState>
          <PrepareApp />
        </OrderState>
      </UserState>
    </PubNubProvider>
  );
}

// import { View, Text, TouchableOpacity } from "react-native";
// // import * as Linking from "expo-linking";
// import { openGMap } from "./utils";

// const Login = () => {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <TouchableOpacity
//         onPressIn={() => openGMap("32.025084135815, 35.85529070977488")}
//       >
//         <Text>click</Text>
//       </TouchableOpacity>
//     </View>
//   );

// };

// export default Login

// Todo [] flip direction to arabic
// Todo [] pull down to refresh
// Todo [] sort orders based on driver location
// Todo [] implement going to google maps
// Todo [] show order status form
// Todo [] edit password
// Todo [] edit password
// Todo [] remove admin stack
