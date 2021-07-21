// please keep all the action creators and reducers in the same file

import { API_STATUS_CHANGE } from '../../actionTypes';
import {
  API_START,
  API_SUCCESS,
  API_FAILURE
 } from '../store/constants';
import {apiInitialState} from '../store/index';
import axios from 'axios';
import {axiosWithAuth} from "../../../common/utils/axiosWithAuth";
// endpoints:
// /users
// /users/:id
// /items
// /items/:id

// /login
// /signup

// action creators



// login
export const postLogIn = (formValues) => (dispatch) =>{
  dispatch({type:API_STATUS_CHANGE,payload:{
    status:API_START,
    api:"postLogIn"
  }});
  axios.post("/users/login",formValues)
  .then((res)=>{
    dispatch({type:API_STATUS_CHANGE,payload:{
      status:API_SUCCESS,
      api:"postLogIn"}});
    // dispatch other actions
  })
  .catch((err)=>{
    dispatch({type:API_STATUS_CHANGE,payload:{
      status:API_FAILURE,
      api:"postLogIn",
      errMsg:err,
    }});
  });
};




// signup
export const createUser = (formValues) => (dispatch) => {
  dispatch({type:API_STATUS_CHANGE,payload:{
    status:API_START,
    api:"createUser"
  }});
  axios.post("/users/register",formValues)
  .then((res)=>{
    dispatch({type:API_STATUS_CHANGE,payload:{
      status:API_SUCCESS,
      api:"createUser"
    }});
    // dispatch other actions
  })
  .catch((err)=>{
    dispatch({type:API_STATUS_CHANGE,payload:{
      status:API_FAILURE,
      api:"createUser",
      errMsg:err,
    }});
  });
};




// put user by id
export const updateUser = (user,id) => (dispatch) => {
  dispatch({type:API_STATUS_CHANGE,payload:{
    status:API_START,
    api:"updateUser"
  }});
  axiosWithAuth().put(`/users/${id}`,user)
  .then((res)=>{
    dispatch({type:API_STATUS_CHANGE,payload:{
      status:API_SUCCESS,
      api:"updateUser"
    }});
    // dispatch other actions
  })
  .catch((err)=>{
    dispatch({type:API_STATUS_CHANGE,payload:{
      status:API_FAILURE,
      api:"updateUser",
      errMsg:err
    }});
  });
}; 




// post new items
export const createItem = (item) => (dispatch) => {
  dispatch({type:API_STATUS_CHANGE,payload:{
    status:API_START,
    api:"createItem"
  }});
  axiosWithAuth().put(`/items/`,item)
  .then((res)=>{
    dispatch({type:API_STATUS_CHANGE,payload:{
      status:API_SUCCESS,
      api:"createItem"
    }});
    // dispatch other actions
  })
  .catch((err)=>{
    dispatch({type:API_STATUS_CHANGE,payload:{
      status:API_FAILURE,
      api:"createItem",
      errMsg:err
    }});
  });
};




// put item by id
export const updateItem = (item,id) => (dispatch) => {
  dispatch({type:API_STATUS_CHANGE,payload:{
    status:API_START,
    api:"updateItem"
  }});
  axiosWithAuth().put(`/items/${id}`,item)
  .then((res)=>{
    dispatch({type:API_STATUS_CHANGE,payload:{
      status:API_SUCCESS,
      api:"updateItem"
    }});
    // dispatch other actions
  })
  .catch((err)=>{
    dispatch({type:API_STATUS_CHANGE,payload:{
      status:API_FAILURE,
      api:"updateItem",
      errMsg:err
    }});
  });
};




// delete item by id
export const deleteItem = (id) => (dispatch) => {
  dispatch({type:API_STATUS_CHANGE,payload:{
    status:API_START,
    api:"deleteItem"
  }});
  axiosWithAuth().delete(`/items/${id}`)
  .then((res)=>{
    dispatch({type:API_STATUS_CHANGE,payload:{
      status:API_SUCCESS,
      api:"deleteItem"
    }});
    // dispatch other actions
  })
  .catch((err)=>{
    dispatch({type:API_STATUS_CHANGE,payload:{
      status:API_FAILURE,
      api:"deleteItem",
      errMsg:err
    }});
  });
};





// reducer

//2. create a features reducer that takes in initialState, sets it equal to state, and takes in an action
export const apiReducer = (state = apiInitialState, action) => {
  //3. initialize switch statement
  switch (action.type) {
    case API_STATUS_CHANGE: {
      const {status,api,errMsg} = action.payload;
      return { ...state,
         [api]:{
           status,
           errMsg
         }
        };
    }
    default:
      return state;
  }
};


// export const getRecipe = (props) => (dispatch) => {
//   //console.log("Incoming props.searchValue to actions = ", props);
//   const options = {
//     method: "GET",
//     url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search",
//     params: { query: props },
//     headers: {
//       "x-rapidapi-key": "b461d692bemshe80b4354ca6ba03p184f2ejsn08a3bb994638",
//       "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
//     },
//   };
//   //   console.log('options incoming to getRecipe', options)
//   //   console.log("API call is going");
//   dispatch({ type: FETCHING_API_START });

//   axios
//     .request(options)
//     .then((res) => {
//       dispatch({ type: FETCHING_API_SUCCESS, payload: res.data.results });
//       console.log("API call is done", res.data.results);
//     })
//     .catch((error) => {
//       dispatch({ type: FETCHING_API_FAILURE, payload: error });
//       console.log("This API request failed", error);
//     });
// };
// export const searchValue = (newSearch) => {
//   //console.log("5. new searchValue is", newSearch);
//   return { type: SEARCH_VALUE, payload: newSearch };
// };