import { combineReducers } from "redux";
import loginReducer from "../login/reducer";

// combineReducers function turns an object whose values are different reducing functions into a single reducing function you can pass to createStore.
const appReducers = combineReducers({
  loginReducer: loginReducer
});

function rootReducer(state, action) {
  let newState = state;
  if (action.type === "CLEAR_STORAGE") {
    newState = undefined;
  }
  return appReducers(newState, action);
}

export default rootReducer;
