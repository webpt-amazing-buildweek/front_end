// other parts of the code can destructure from this file.

// import and export all action creators
// make sure to comment what each does

import {
    postLogIn as _postLogIn,
    createUser as _createUser,
    updateUser as _updateUser,
    createItem as _createItem,
    updateItem as _updateItem,
    deleteItem as _deleteItem
} from "./_shared/middleware/api";


export const postLogIn = _postLogIn;
// args:
// formValues {
//     name: string;
//     password: string;
//   }
// actions: API_STATUS_CHANGE
// state changed: api
export const createUser = _createUser;
// args:
// formValues {
//     name: string;
//     email: string;
//     password: string;
//     isOwner: boolean;
//   }
// actions: API_STATUS_CHANGE
// state changed: api
export const updateUser = _updateUser;
// args:
// user {
//     name: string;
//     email: string;
//     password: string;
//     isOwner: boolean;
//   }
// actions: API_STATUS_CHANGE
// state changed: api
export const createItem = _createItem;
// args:
// item {
//     name: string;
//     description: string;
//     location: string;
//     price: number;
//   }
// actions: API_STATUS_CHANGE
// state changed: api
export const updateItem = _updateItem;
// args:
// item {
//     name: string;
//     description: string;
//     location: string;
//     price: number;
//   }
// id: number;
// actions: API_STATUS_CHANGE
// state changed: api
export const deleteItem = _updateItem;
// args:
// id: number;
// actions: API_STATUS_CHANGE
// state changed: api



