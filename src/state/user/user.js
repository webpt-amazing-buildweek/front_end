import { UPDATE_USER, } from '../../actionTypes';
import { userInitialState } from '../store/index';
import axios from 'axios';


//Actions

//setUser






//Reducer
export const userReducer = (state = userInitialState, action) => {
  //3. initialize switch statement
  switch (action.type) {
    case UPDATE_USER: {
      return state;
    }

    default:
      return state;
  }
};