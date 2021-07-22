// please reference https://asleepysamurai.com/articles/organizing-your-react-redux-codebase for the code structure

// where we will combine all the reducers into a rootReducer
import { combineReducers } from "redux";
import { apiReducer } from "./_shared/middleware/api";
import {userReducer} from "./user/user";
import {itemsReducer} from "./items/items";
export const rootReducer = combineReducers({
   api: apiReducer,
   user: userReducer,
   items: itemsReducer
});