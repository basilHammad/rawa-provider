import "react-native-gesture-handler";
import { I18nManager } from "react-native";

import PrepareApp from "./PrepareApp";
import UserState from "./context/user/userState";
import OrderState from "./context/order/orderState";

export default function App() {
  I18nManager.forceRTL(true);
  I18nManager.allowRTL(true);

  return (
    <UserState>
      <OrderState>
        <PrepareApp />
      </OrderState>
    </UserState>
  );
}

// Todo [] sort orders based on driver location
// Todo [] order submit

// Todo [] fix the logo
// Todo [] remove admin stack

// Todo [*] edit password
// Todo [*] flip direction to arabic
// Todo [*] pull down to refresh
// Todo [*] implement going to google maps
// Todo [*] show order status form
// Todo [*] change font

// ! get orders by trip id needed

/**
 * 1 list orders based on location from current location
 * 2 move orders without lat && lng to the end of the page
 * 3 navigate the driver to maps with directions
 * 4 show order state form
 * 5 send driver location when the order is delevared if the order has no directions
 * 6 the order status should change & should be removed from the trip
 * 7 after finishing all orders on trip the trip should be removed from driver trips
 */
