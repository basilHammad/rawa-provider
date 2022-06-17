import PrepareApp from "./PrepareApp";
import UserState from "./context/user/userState";
import OrderState from "./context/order/orderState";
import PubNub from "pubnub";
import { PubNubProvider } from "pubnub-react";

const pubnub = new PubNub({
  publishKey: "pub-c-4b2e0ecf-f13a-4e2c-b574-43458fbd40a7",
  subscribeKey: "sub-c-7d878e83-a128-4dc1-8525-52f8f33e00f3",
});

export default function App() {
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
