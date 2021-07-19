// We need to have one single reducer. So redux provides us combineReducers
import { combineReducers } from "redux";
import auth from "./authReducer";

export default combineReducers({
    auth,
})