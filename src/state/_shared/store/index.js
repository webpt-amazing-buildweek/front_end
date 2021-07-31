// This is where we will store all the states
import {API_IDLE} from "./constants";
export const apiInitialState = {
      postLogIn:{
        numberOfSuccessCalls:0,
        status:API_IDLE,
        errMsg:""
      },
      createUser:{
        numberOfSuccessCalls:0,
        status:API_IDLE,
        errMsg:""
      },
      getItems:{
        numberOfSuccessCalls:0,
        status:API_IDLE,
        errMsg:""
      },
      createItem:{
        numberOfSuccessCalls:0,
        status:API_IDLE,
        errMsg:""
      },
      updateItem:{
        numberOfSuccessCalls:0,
        status:API_IDLE,
        errMsg:""
      },
      deleteItem:{
        numberOfSuccessCalls:0,
        status:API_IDLE,
        errMsg:""
      },
  };


export const userInitialState = {
  id: -1,
  username:"",
  email:"",
  items: [], //item objects,
  cart:[],
  isOwner: false

};

export const itemsInitialState = [];

// Item Object
// {
//    id: integer
//    item_name: string
//    location: string
//    quantity: integer
//    price: float
//    description: string
//    user_id: integer
//    image_url: string
// }