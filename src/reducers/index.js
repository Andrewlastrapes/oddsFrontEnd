import { combineReducers } from 'redux';
import alert from "./alert";
import user from "./user";
import dashboard from "./dashboard";

export default combineReducers({
    alert,
    user,
    dashboard
});