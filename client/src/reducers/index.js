import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import leadReducer from "./leadReducers";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  lead: leadReducer
});