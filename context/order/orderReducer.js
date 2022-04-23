import * as types from "../actionTypes";

const orderReducer = (state, action) => {
  switch (action.type) {
    case types.GET_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
    case types.SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export default orderReducer;
