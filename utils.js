import { Keyboard } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Clipboard from "expo-clipboard";

export const closeKeyboard = () => {
  console.log(12);
  Keyboard.dismiss();
};

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.log(err);
  }
};

export const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (err) {
    console.log(err);
  }
};

export const copyToClipboard = (val) => {
  Clipboard.setString(val);
};
