import {userInitialState} from '../_shared/store/index';
import { 
  USER_LOGGED_IN,
  USER_CREATED,
  USER_LOGGED_OUT,
  USER_ITEMS_RECEIVED,
  USER_CART_ITEM_ADDED,
  USER_CART_ITEM_REMOVED,
  USER_AUTH_CHECKED
} from '../actionTypes';


//Actions

//setUser
export const logout=()=>{
  // remove token from localStorage
  console.log("logout complete")
  localStorage.clear()
  return {type:USER_LOGGED_OUT}
};
export const addToCart=(id)=>{
  return {type:USER_CART_ITEM_ADDED,payload:id};
};

export const removeFromCart=(id)=>{
  return {type:USER_CART_ITEM_REMOVED,payload:id};
};

// retain user state action
export const checkUserAuth =() => {
  const user = JSON.parse(localStorage.getItem("user"));
  if(user){
    return {type: USER_AUTH_CHECKED,payload:user};
  }
  else{
    localStorage.clear();
    return {type: USER_AUTH_CHECKED,payload:{}};
  }
}

//Reducer
export const userReducer = (state = userInitialState, action) => {
  //3. initialize switch statement
  switch (action.type) {
    case USER_LOGGED_IN: {
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
    case USER_CART_ITEM_ADDED:{
      const itemId = action.payload;
      return {
        ...state,
        cart:[...state.cart,itemId]
      }
    }
    case USER_CART_ITEM_REMOVED:{
      const itemId = action.payload;
      return {
        ...state,
        cart:state.cart.filter((id)=>id!==itemId)
      }
    }
    case USER_AUTH_CHECKED:{
      const user = action.payload;
      return {
        ...state,
        ...user
      };
    }
    default:
      return state;
  }
};