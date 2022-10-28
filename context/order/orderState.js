import React, { useReducer } from "react";
import fetcher from "../../config/axios";
import orderContext from "./orderContext";
import orderReducer from "./orderReducer";

import * as types from "../actionTypes";

const orderState = (props) => {
  const intialState = {
    orders: [],
    trips: [],
    drivers: [],
    isLoading: false,
    internalLoading: false,
  };

  const [state, dispatch] = useReducer(orderReducer, intialState);

  const setIsloading = (val) => {
    dispatch({
      type: types.SET_IS_LOADING,
      payload: val,
    });
  };

  const setInternalLoading = (val) => {
    dispatch({ type: types.SET_INTERNAL_LOADING, payload: val });
  };

  const getOrders = async () => {
    setIsloading(true);
    try {
      const res = await fetcher.get("api/orders");
      if (res.data) {
        dispatch({
          type: types.GET_ORDERS,
          payload: res.data.data,
        });
        setIsloading(false);
      }
    } catch (error) {
      setIsloading(false);
      console.warn({ ...error });
    }
  };

  const getTrips = async () => {
    setIsloading(true);
    try {
      const res = await fetcher.get("api/trips");
      if (res.data) {
        dispatch({
          type: types.GET_TRIPS,
          payload: res.data.data,
        });
        setIsloading(false);
      }
    } catch (error) {
      // setIsloading(false);
      console.warn("error", { ...error });
    }
  };

  const createTrip = async (selectidOrdersIds, name, goToTrips, setError) => {
    setInternalLoading(true);

    const selectedIds = selectidOrdersIds.map((id) => ({ orders_id: id }));

    const data = JSON.stringify({
      trip_name: name,
      orders_ids: selectedIds,
    });

    try {
      const res = await fetcher.post("api/trips", data);
      if (res.data) {
        setInternalLoading(false);

        setError(""); // ! could create memory leack
        goToTrips();
      }
    } catch (error) {
      setInternalLoading(false);
      console.warn(error);
    }
  };

  const assignDriver = async (tripId, driverId, note, setError, cb) => {
    setInternalLoading(true);

    const data = JSON.stringify({
      driver_id: driverId,
    });

    try {
      const res = await fetcher.put(`api/trips/${tripId}`, data);

      if (res.data) {
        setInternalLoading(false);
        cb();
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
        setInternalLoading(false);
      } else {
        console.warn(error);
      }

      setInternalLoading(false);
    }
  };

  return (
    <orderContext.Provider
      value={{
        ...state,
        getOrders,
        getTrips,
        createTrip,
        assignDriver,
      }}
    >
      {props.children}
    </orderContext.Provider>
  );
};

export default orderState;
