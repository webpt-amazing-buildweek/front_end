import {userInitialState} from '../_shared/store/index';
import { 
  USER_LOGGED_IN,
  USER_CREATED,
  USER_LOGGED_OUT,
  USER_ITEMS_RECEIVED,
} from '../actionTypes';


//Actions

//setUser
export const logout=()=>{
  // remove token from localStorage
  return {type:USER_LOGGED_OUT}
};


//Reducer
export const userReducer = (state = userInitialState, action) => {
  //3. initialize switch statement
  switch (action.type) {
    case USER_LOGGED_IN: {
      // backend may return a user object
      const {id, email, username, isOwner} = action.payload.user;
      return {
        ...state,
        id,
        email,
        username,
        isOwner
      };
    }
    case USER_LOGGED_OUT:{
      // empty out user state
      return userInitialState;
    }
    case USER_CREATED: {
      // backend may return a user object
      const {id, email, username, isOwner} = action.payload;
      return {
        ...state,
        id,
        email,
        username,
        isOwner
      };
    }

    case USER_ITEMS_RECEIVED:{
      const items = action.payload.filter(item=>item.user_id===state.id);
      return {
        ...state,
        items:items
      }
    }
    default:
      return state;
  }
};