import React, { useReducer } from "react";
import fetcher from "../../config/axios";
import userContext from "./userContext";
import userReducer from "./userReducer";

import * as types from "../actionTypes";
import { storeData } from "../../utils";

const UserState = (props) => {
  const intialState = {
    user: [],
    isLoggedin: false,
    isAdmin: true,
    isLoading: false,
  };

  const [state, dispatch] = useReducer(userReducer, intialState);

  const setIsLoggedin = (val) => {
    dispatch({
      type: types.SET_IS_LOGGEDIN,
      payload: val,
    });
  };

  const setIsAdmin = (val) => {
    dispatch({
      type: types.SET_IS_ADMIN,
      payload: val,
    });
  };

  const setIsloading = (val) => {
    dispatch({
      type: types.SET_IS_LOADING,
      payload: val,
    });
  };

  const login = async (userName, password, setErrors) => {
    setIsloading(true);
    try {
      const data = JSON.stringify({
        username: userName,
        password: password,
      });

      const res = await fetcher.post("api/login", data);

      if (res.data) {
        setIsloading(false);

        setErrors({});
        dispatch({
          type: types.GET_USER_DATA,
          payload: res.data.data,
        });
        await storeData("userToken", res.data.data.access_token);
        await storeData("userRole", res.data.data.role);
      }

      if (res.data.data.role !== "provider") setIsAdmin(false);
    } catch (error) {
      if (error.response) {
        setIsloading(false);

        if (error.response.status === 401) {
          setErrors((prev) => ({
            ...prev,
            generalError: error.response.data.message,
          }));
        }

        console.log({ ...error });
      }
    }
  };

  return (
    <userContext.Provider
      value={{
        ...state,
        login,
        setIsLoggedin,
        setIsAdmin,
      }}
    >
      {props.children}
    </userContext.Provider>
  );
};

export default UserState;
