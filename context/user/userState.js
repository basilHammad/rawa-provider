import React, { useReducer } from "react";
import userContext from "./userContext";
import userReducer from "./userReducer";

const TodoState = (props) => {
  const intialState = {
    user: [],
  };

  const [state, dispatch] = useReducer(userReducer, intialState);

  return (
    <userContext.Provider value={{ user }}>
      {props.children}
    </userContext.Provider>
  );
};

export default TodoState;
