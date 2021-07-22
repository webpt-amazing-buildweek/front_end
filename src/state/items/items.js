import { UPDATE_ITEMS, DELETE_ITEMS } from '../../actionTypes';
import {itemsInitialState} from '../store/index';
import axios from 'axios';


//Actions

//setUser






//Reducer
export const itemsReducer = (state = itemsInitialState, action) => {
  //3. initialize switch statement
  switch (action.type) {
    case UPDATE_ITEMS: {
      return state;
    }
    case DELETE_ITEMS: {
      return state;
    }
    default:
      return state;
  }
};