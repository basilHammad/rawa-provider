import PrepareApp from "./PrepareApp";
import UserState from "./context/user/userState";
import OrderState from "./context/order/orderState";

export default function App() {
  return (
    <UserState>
      <OrderState>
        <PrepareApp />
      </OrderState>
    </UserState>
  );
}
