import * as types from "../actionTypes";

const orderReducer = (state, action) => {
  switch (action.type) {
    case types.GET_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
    case types.GET_TRIPS:
      const updatedDrivers = action.payload.drivers.map((driver) => ({
        label: driver.full_name,
        id: driver.id,
      }));
      return {
        ...state,
        trips: action.payload.trips,
        drivers: updatedDrivers,
      };
    case types.SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case types.SET_INTERNAL_LOADING:
      return {
        ...state,
        internalLoading: action.payload,
      };
    default:
      return state;
  }
};

export default orderReducer;
