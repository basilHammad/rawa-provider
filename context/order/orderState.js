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
    trip: {},
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

  const getTrips = async (cb) => {
    setIsloading(true);
    try {
      const res = await fetcher.get("api/trips");
      if (res.data) {
        dispatch({
          type: types.GET_TRIPS,
          payload: res.data.data,
        });
        setIsloading(false);
        if (cb) cb();
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

  const editOrder = async (id, status, note, cb) => {
    setIsloading(true);
    try {
      const data = JSON.stringify({
        reason_note: note,
        status: status,
        type: 2,
      });

      const res = await fetcher.put(`api/customer-order/${id}`, data);

      if (res.status === 200) cb();

      setIsloading(false);
    } catch (error) {
      console.log({ ...error });
      setIsloading(false);
    }
  };

  const getTripById = async (id) => {
    setIsloading(true);
    try {
      const res = await fetcher.get(`api/trips/${id}`);

      if (res.data.data) {
        dispatch({
          type: types.GET_TRIP_BY_ID,
          payload: res.data.data,
        });
      }

      setIsloading(false);

      // console.log("res.data", res.data);
    } catch (error) {
      setIsloading(false);

      console.log({ ...error });
    }
  };

  const endTrip = async (id, cb) => {
    setIsloading(true);
    try {
      const data = JSON.stringify({
        status: "3",
      });

      const res = await fetcher.put(`api/trips/${id}`, data);
      if (res.status === 200) cb();
      setIsloading(false);
    } catch (error) {
      console.log(error);
      setIsloading(false);
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
        editOrder,
        getTripById,
        endTrip,
      }}
    >
      {props.children}
    </orderContext.Provider>
  );
};

export default orderState;
