import { combineReducers } from "redux";
// import userReducer from "./userReducer";
import usernameReducer from "./usernameReducer";

export default combineReducers({
	username: usernameReducer,
});
