import { ITEMS_RECEIVED, } from '../actionTypes';
import {itemsInitialState} from '../_shared/store/index';



//Actions

//setUser






//Reducer
export const itemsReducer = (state = itemsInitialState, action) => {
  //3. initialize switch statement
  switch (action.type) {
    case ITEMS_RECEIVED: {
      const items = action.payload;
      return items;
    }
    default:
      return state;
  }
};