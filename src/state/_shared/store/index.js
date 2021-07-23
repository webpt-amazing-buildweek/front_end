// This is where we will store all the states
import {API_IDLE} from "./constants";
export const apiInitialState = {
      postLogIn:{
        status:API_IDLE,
        errMsg:""
      },
      createUser:{
        status:API_IDLE,
        errMsg:""
      },
      updateUser:{
        status:API_IDLE,
        errMsg:""
      },
      getItems:{
        status:API_IDLE,
        errMsg:""
      },
      createItem:{
        status:API_IDLE,
        errMsg:""
      },
      updateItem:{
        status:API_IDLE,
        errMsg:""
      },
      deleteItem:{
        status:API_IDLE,
        errMsg:""
      },
  };


export const userInitialState = {
  id: -1,
  username:"",
  email:"",
  items: [], //ids of the items go here
  isOwner: false

}

export const itemsInitialState = {
// key: item id
// value: items
}