import { Text, View } from "react-native";
import { useState, useEffect } from "react";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import AdminStack from "./routes/AdminStack";
import DriverStack from "./routes/DriverStack";
import Login from "./screens/Login";
import { getData } from "./utils";
import axios from "axios";

export default function App() {
  const [isLogedin, setIsLoggedin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // ! this should change to false initialy
  const [appIsReady, setAppIsReady] = useState(false);

  const prepare = async () => {
    try {
      await SplashScreen.preventAutoHideAsync();
      await Font.loadAsync({
        robotoBold: require("./assets/fonts/roboto/bold.ttf"),
        robotoRegular: require("./assets/fonts/roboto/regular.ttf"),
        robotoSemiBold: require("./assets/fonts/roboto/semiBold.ttf"),
      });

      const token = await getData("token");
      if (token) {
        // validate token

        const userData = await getData("userData");
        if (userData.roll === "provider") setIsAdmin(true);
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
  }, []);

  if (!appIsReady) {
    return null;
  }

  return isLogedin ? (
    isAdmin ? (
      <AdminStack />
    ) : (
      <DriverStack />
    )
  ) : (
    <Login setIsLoggedin={setIsLoggedin} />
  );
}
