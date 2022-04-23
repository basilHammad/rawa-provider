import { useState, useContext, useEffect } from "react";
import { View, TouchableWithoutFeedback, Text } from "react-native";

import Container from "../components/Container";
import Input from "../components/Input";
import { Btn } from "../components/Buttons";
import { COLORS, FONTS, SIZES } from "../constants";
import { closeKeyboard, validateLoginForm } from "../utils";
import userContext from "../context/user/userContext";
import Spinner from "react-native-loading-spinner-overlay";

const Login = () => {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const { isLoading, login } = useContext(userContext);

  const handelSubmit = () => {
    const validationErrors = validateLoginForm(username, password);
    // if (Object.keys(validationErrors).length) {
    //   setErrors(validationErrors);
    //   return;
    // }

    login("api_provider", "123456", setErrors);
  };

  return (
    <Container>
      {isLoading ? (
        <Spinner visible={isLoading} />
      ) : (
        <TouchableWithoutFeedback onPress={closeKeyboard}>
          <View
            style={{
              flex: 1,
              paddingTop: 200,
              alignItems: "center",
            }}
          >
            {errors?.generalError && (
              <Text
                style={{
                  color: COLORS.red,
                  fontFamily: FONTS.semiBold,
                  marginBottom: SIZES.medium,
                }}
              >
                {errors?.generalError}
              </Text>
            )}
            <Input
              value={username}
              onChange={setusername}
              placeholder="username or mobile number"
              error={errors.username}
            />
            <Input
              value={password}
              onChange={setPassword}
              placeholder="Password"
              error={errors.password}
              isPassword
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
      )}
    </Container>
  );
};

export default Login;
