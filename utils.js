import { Keyboard, Linking, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Clipboard from "expo-clipboard";
import CryptoJS from "crypto-js";
import haversine from "haversine";

import { PASS_PHRASE } from "@env";

const encryptWithAES = (text) => {
  return CryptoJS.AES.encrypt(text, PASS_PHRASE).toString();
};

const decryptWithAES = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, PASS_PHRASE);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};

export const closeKeyboard = () => {
  Keyboard.dismiss();
};

export const storeData = async (key, value) => {
  try {
    const encryptedValue = encryptWithAES(value);
    await AsyncStorage.setItem(key, JSON.stringify(encryptedValue));
  } catch (err) {
    console.log(err);
  }
};

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    const decryptedValue = value ? decryptWithAES(JSON.parse(value)) : null;
    return decryptedValue;
  } catch (err) {
    console.log(err);
  }
};

export const copyToClipboard = (val) => {
  Clipboard.setString(val);
};

export const validateLoginForm = (username, password) => {
  const errors = {};
  if (!username.trim().length) errors.username = "username cant be empty";
  if (!password.trim().length) errors.password = "password cant be empty";

  return errors;
};

export const makeCall = (phoneNumber) => {
  if (Platform.OS === "android") {
    Linking.openURL(`tel:${phoneNumber}`);
  } else {
    Linking.openURL(`telprompt:${phoneNumber}`);
  }
};

const getClosestPointToOrigin = (origin, points) => {
  const closest = points
    .map((point) => {
      return { dist: haversine(origin, point), ...point };
    })
    .reduce((prev, current) => {
      return prev.dist < current.dist ? prev : current;
    });
  return closest;
};

/**
 * loop throw the numbers of addresses
 * for each address return the cords of the closest address
 * flip the origin with the closests
 */
export const sortCoords = (curruntLocation, addressesArray) => {
  let origin = curruntLocation;
  let remainigPoints = [...addressesArray];
  let closest;
  const sorted = [];

  for (let i = 0; i < addressesArray.length; i++) {
    closest = getClosestPointToOrigin(origin, remainigPoints);
    sorted.push(closest);
    origin = closest;

    remainigPoints = [
      ...remainigPoints.filter((point) => point.id !== origin.id),
    ];
  }

  return sorted;
};
