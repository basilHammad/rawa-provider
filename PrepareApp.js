import { useState, useEffect, useContext } from "react";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import AdminStack from "./routes/AdminStack";
import DriverStack from "./routes/DriverStack";
import Login from "./screens/Login";
import { getData } from "./utils";
import userContext from "./context/user/userContext";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PrepareApp() {
  const [appIsReady, setAppIsReady] = useState(false);
  const { isAdmin, isLoggedin, setIsAdmin, setIsLoggedin } =
    useContext(userContext);

  const prepare = async () => {
    try {
      await SplashScreen.preventAutoHideAsync();
      await Font.loadAsync({
        robotoBold: require("./assets/fonts/roboto/bold.ttf"),
        robotoRegular: require("./assets/fonts/roboto/regular.ttf"),
        robotoSemiBold: require("./assets/fonts/roboto/semiBold.ttf"),
      });

      const token = await getData("userToken");
      if (token) {
        const role = await getData("userRole");
        if (role !== "provider") setIsAdmin(false);
        setIsLoggedin(true);
      }
    } catch (e) {
      console.warn(e);
    } finally {
      setAppIsReady(true);
      SplashScreen.hideAsync();
    }
  };

  useEffect(() => {
    prepare();
    // AsyncStorage.clear();
  }, []);

  if (!appIsReady) return null;

  return isLoggedin ? (
    isAdmin ? (
      <AdminStack />
    ) : (
      <DriverStack />
    )
  ) : (
    <Login setIsLoggedin={setIsLoggedin} />
  );
}
