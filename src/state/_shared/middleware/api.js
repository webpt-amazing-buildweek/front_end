// please keep all the action creators and reducers in the same file

import { FETCHING_API_START, FETCHING_API_SUCCESS, FETCHING_API_FAILURE, SEARCH_VALUE } from '../../actionTypes';
import {apiInitialState} from '../store/index';
import axios from 'axios';


// action creators
export const searchValue = (newSearch) => {
    //console.log("5. new searchValue is", newSearch);
    return { type: SEARCH_VALUE, payload: newSearch };
  };
  
export const getRecipe = (props) => (dispatch) => {
    //console.log("Incoming props.searchValue to actions = ", props);
    const options = {
      method: "GET",
      url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search",
      params: { query: props },
      headers: {
        "x-rapidapi-key": "b461d692bemshe80b4354ca6ba03p184f2ejsn08a3bb994638",
        "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      },
    };
    //   console.log('options incoming to getRecipe', options)
    //   console.log("API call is going");
    dispatch({ type: FETCHING_API_START });
  
    axios
      .request(options)
      .then((res) => {
        dispatch({ type: FETCHING_API_SUCCESS, payload: res.data.results });
        console.log("API call is done", res.data.results);
      })
      .catch((error) => {
        dispatch({ type: FETCHING_API_FAILURE, payload: error });
        console.log("This API request failed", error);
      });
  };
// reducer

//2. create a features reducer that takes in initialState, sets it equal to state, and takes in an action
export const apiReducer = (state = apiInitialState, action) => {
  //3. initialize switch statement
  switch (action.type) {
    case FETCHING_API_START: {
      //log("FETCH RUNNING THROUGH REDUCER");
      return { ...state, loading: true };
    }
    case FETCHING_API_SUCCESS: {
      //log("FETCH SUCCESS THROUGH REDUCER");
      return { ...state, loading: false, recipe: action.payload };
    }
    case FETCHING_API_FAILURE: {
      //log("FETCH FAIL FROM REDUCER");
      return { ...state, loading: false, error: action.payload };
    }
    case SEARCH_VALUE: {
      //log("3. SEARCH VALUE FROM REDUCER", action.payload);
      return { ...state, searchValue: action.payload };
    }
    default:
      return state;
  }
};