import React, { useState } from "react";
import { View, TouchableWithoutFeedback, Text } from "react-native";

import Container from "../components/shared/Container";
import Input from "../components/shared/Input";
import { Btn } from "../components/shared/Buttons";
import { COLORS, FONTS, SIZES } from "../constants";
import { storeData, closeKeyboard } from "../utils";

const Login = ({ setIsLoggedin }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ userName: "", password: "" });

  const handelSubmit = async () => {
    // validate
    // post the form
    // save the access Token
    // save userData
    // redirect to home based on user role
    await storeData("token", "value");
    await storeData("userData", { username: "admin", role: "admin" });
    setIsLoggedin(true);
  };

  return (
    <Container>
      <TouchableWithoutFeedback onPress={closeKeyboard}>
        <View
          style={{
            flex: 1,
            paddingTop: 200,
            alignItems: "center",
          }}
        >
          <Input
            value={userName}
            onChange={setUserName}
            placeholder="Username or mobile number"
            error={errors.userName}
          />
          <Input
            value={password}
            onChange={setPassword}
            placeholder="Password"
            error={errors.password}
          />
          <Btn
            style={{
              backgroundColor: COLORS.yellow,
              width: "100%",
              justifyContet: "center",
              alignItems: "center",
              padding: SIZES.small,
              borderRadius: SIZES.medium,
            }}
            onPress={handelSubmit}
          >
            <Text style={{ fontFamily: FONTS.bold }}>Login</Text>
          </Btn>
        </View>
      </TouchableWithoutFeedback>
    </Container>
  );
};

export default Login;
