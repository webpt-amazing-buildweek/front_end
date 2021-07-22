import {userInitialState} from '../store/index';
import { USER_LOGGED_IN, USER_CREATED, USER_UPDATED, USER_LOGGED_OUT } from '../actionTypes';


//Actions

//setUser
export const logout=()=>{
  // remove token from localStorage
  return
};


//Reducer
export const userReducer = (state = userInitialState, action) => {
  //3. initialize switch statement
  switch (action.type) {
    case USER_LOGGED_IN: {
      // backend may return a user object
      const {id, items, isOwner} = action.payload;
      return {
        ...state,
        id,
        items,
        isOwner
      };
    }
    case USER_LOGGED_OUT:{
      // empty out user state
      return userInitialState;
    }
    case USER_CREATED: {
      // backend may return a user object
      const {id, items, isOwner} = action.payload;
      return {
        ...state,
        id,
        items,
        isOwner
      };
    }
    case USER_UPDATED: {
      // backend may return a user object
      const {id, items, isOwner} = action.payload;
      return {
        ...state,
        id,
        items,
        isOwner
      };
    }
    default:
      return state;
  }
};