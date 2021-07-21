import { FETCHING_USER_LOGIN_START, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE} from '../../actionTypes';
import {userInitialState} from '../store/index';
import axios from 'axios';











export const userReducer = (state = userInitialState, action) => {
  //3. initialize switch statement
  switch (action.type) {
    case FETCHING_USER_LOGIN_START: {
      //log("FETCH RUNNING THROUGH REDUCER");
      return { ...state, loading: true };
    }
    case USER_LOGIN_SUCCESS: {
      //log("FETCH SUCCESS THROUGH REDUCER");
      return { ...state, loading: false, recipe: action.payload };
    }
    case USER_LOGIN_FAILURE: {
      //log("FETCH FAIL FROM REDUCER");
      return { ...state, loading: false, error: action.payload };
    }
    default:
      return state;
  }
};