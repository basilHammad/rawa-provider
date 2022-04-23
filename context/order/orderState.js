import React, { useReducer } from "react";
import fetcher from "../../config/axios";
import orderContext from "./orderContext";
import orderReducer from "./orderReducer";

import * as types from "../actionTypes";

const orderState = (props) => {
  const intialState = {
    orders: [],
    isLoading: false,
  };

  const [state, dispatch] = useReducer(orderReducer, intialState);

  const setIsloading = (val) => {
    dispatch({
      type: types.SET_IS_LOADING,
      payload: val,
    });
  };

  const getOrders = async () => {
    setIsloading(true);
    try {
      const res = await fetcher.get("api/orders");
      if (res.data) {
        //   console.log(res.data.data);
        dispatch({
          type: types.GET_ORDERS,
          payload: res.data.data,
        });
        setIsloading(false);
      }
    } catch (error) {
      setIsloading(false);
      console.warn(error);
    }
  };

  return (
    <orderContext.Provider
      value={{
        ...state,
        getOrders,
      }}
    >
      {props.children}
    </orderContext.Provider>
  );
};

export default orderState;
