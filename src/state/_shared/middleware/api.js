// please keep all the action creators and reducers in the same file

import { API_STATUS_CHANGE,
  ITEMS_RECEIVED, 
  USER_CREATED, 
  USER_ITEMS_RECEIVED, 
  USER_LOGGED_IN, 
} from '../../actionTypes';
import {
  API_START,
  API_SUCCESS,
  API_FAILURE
 } from '../store/constants';
import {apiInitialState} from '../store/index';
import axios from 'axios';
import {axiosWithAuth} from "../../../common/utils/axiosWithAuth";

const baseURL = "https://sauti-market-bw.herokuapp.com";
// endpoints:
// /users
// /users/:id
// /items
// /items/:id

// /login
// /signup

// action creators

// test response
export const testResponse =()=>(dispatch)=>{
  dispatch({type:API_STATUS_CHANGE,payload:{
    status:API_START,
    api:"testResponse"
  }});
  axios.get(baseURL)
  .then((res)=>{
    dispatch({type:API_STATUS_CHANGE,payload:{
      status:API_SUCCESS,
      api:"testResponse"}});
    // dispatch other actions
    // dispatch USER_LOGGED_IN payload: res.data
    // dispatch({type:USER_LOGGED_IN,payload:res.data});
    // localStorage to store the token

  })
  .catch((err)=>{
    dispatch({type:API_STATUS_CHANGE,payload:{
      status:API_FAILURE,
      api:"testResponse",
      errMsg:err,
    }});
  });
}


// login
export const postLogIn = (formValues, handleAPIStatus) => (dispatch) =>{
  dispatch({type:API_STATUS_CHANGE,payload:{
    status:API_START,
    api:"postLogIn"
  }});
  axios.post(`${baseURL}/api/auth/login`,formValues)
  .then((res)=>{
    handleAPIStatus(true)
    dispatch({type:API_STATUS_CHANGE,payload:{
      status:API_SUCCESS,
      api:"postLogIn"}});
    // dispatch other actions
    // dispatch USER_LOGGED_IN payload: res.data
    dispatch({type:USER_LOGGED_IN,payload:res.data});
    localStorage.setItem("authToken",res.data.token) //save the authentication
    localStorage.setItem('userObject', JSON.stringify(res.data))// save the user object in local storage
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
  console.log(formValues)
  axios.post(`${baseURL}/api/auth/register`,formValues)
  .then((res)=>{
    dispatch({type:API_STATUS_CHANGE,payload:{
      status:API_SUCCESS,
      api:"createUser"
    }});
    // dispatch other actions
    // dispatch USER_CREATED 
    dispatch({type:USER_CREATED,payload:res.data})
  })
  .catch((err)=>{
    dispatch({type:API_STATUS_CHANGE,payload:{
      status:API_FAILURE,
      api:"createUser",
      errMsg:err,
    }});
  });
};

// get items
export const getItems = () => (dispatch) => {
  dispatch({type:API_STATUS_CHANGE,payload:{
    status:API_START,
    api:"getItems"
  }});
  axiosWithAuth(baseURL).get(`api/items`)
  .then((res)=>{
    dispatch({type:API_STATUS_CHANGE,payload:{
      status:API_SUCCESS,
      api:"getItems"
    }});
    // dispatch other actions
    dispatch({type:ITEMS_RECEIVED,payload:res.data}); // call the items reducer
    dispatch({type:USER_ITEMS_RECEIVED,payload:res.data}); //call the user reducer
  })
  .catch((err)=>{
    dispatch({type:API_STATUS_CHANGE,payload:{
      status:API_FAILURE,
      api:"createItem",
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
  axiosWithAuth(baseURL).post(`api/items`,item)
  .then((res)=>{
    dispatch({type:API_STATUS_CHANGE,payload:{
      status:API_SUCCESS,
      api:"createItem"
    }});
    // dispatch other actions
    // dispatch ITEM_CREATED
    dispatch(getItems()); //make a get request to stay up to date with the backend
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
  axiosWithAuth(baseURL).put(`api/items/${id}`,item)
  .then((res)=>{
    dispatch({type:API_STATUS_CHANGE,payload:{
      status:API_SUCCESS,
      api:"updateItem"
    }});
    // dispatch other actions
    dispatch(getItems()); //make a get request to stay up to date with the backend
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
  axiosWithAuth(baseURL).delete(`api/items/${id}`)
  .then((res)=>{
    dispatch({type:API_STATUS_CHANGE,payload:{
      status:API_SUCCESS,
      api:"deleteItem"
    }});
    dispatch(getItems()); //make a get request to stay up to date with the backend
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
      let calls = state[api].numberOfSuccessCalls;
      if(status===API_SUCCESS){
        calls++;
      }
      return { ...state,
         [api]:{
           numberOfSuccessCalls:calls,
           status,
           errMsg
         }
        };
    }
    default:
      return state;
  }
};

