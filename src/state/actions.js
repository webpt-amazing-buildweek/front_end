// other parts of the code can destructure from this file.

// import and export all action creators
// make sure to comment what each does

import {
    postLogIn as _postLogIn,
    createUser as _createUser,
    updateUser as _updateUser,
    getItems as _getItems,
    createItem as _createItem,
    updateItem as _updateItem,
    deleteItem as _deleteItem
} from "./_shared/middleware/api";

import { logout } from "./user/user";


// api user action creators
export const postLogIn = _postLogIn;
// args:
// formValues {
//     name: string;
//     password: string;
//   }
// actions: API_STATUS_CHANGE, USER_LOGGED_IN
// state changed: api, user
export const createUser = _createUser;
// args:
// formValues {
//     name: string;
//     email: string;
//     password: string;
//     isOwner: boolean;
//   }
// actions: API_STATUS_CHANGE, USER_CREATED
// state changed: api, user
export const updateUser = _updateUser;
// args:
// user {
//     name: string;
//     email: string;
//     password: string;
//     isOwner: boolean;
//   }
// actions: API_STATUS_CHANGE, USER_UPDATED
// state changed: api, user
export const getItems = _getItems;
// args:
// actions: API_STATUS_CHANGE,ITEMS_RECEIVED
// state changed: api, items
export const createItem = _createItem;
// args:
// item {
//     name: string;
//     description: string;
//     location: string;
//     price: number;
//   }
// actions: API_STATUS_CHANGE, ITEM_CREATED
// state changed: api, items
export const updateItem = _updateItem;
// args:
// item {
//     name: string;
//     description: string;
//     location: string;
//     price: number;
//   }
// id: number;
// actions: API_STATUS_CHANGE, ITEM_UPDATED
// state changed: api, items
export const deleteItem = _deleteItem;
// args:
// id: number;
// actions: API_STATUS_CHANGE,ITEM_DELETED
// state changed: api, items




// user action creators
export const logout = _logout;
// args:
// actions:USER_LOGGED_OUT, 
// state changed:user
