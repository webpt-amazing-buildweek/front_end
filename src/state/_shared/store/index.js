// This is where we will store all the states

export const apiInitialState = {
    loading: false,
    error: "",
    searchValue: "",
  };


// export const ownerInitalState = {
//   id: "",
//   items: [],//ids of the items go here


// }

export const userInitialState = {
  id: "",
  cart: [], //ids of the items go here
  orders: [], //ids of the items go here
  isOwner: false

}

export const itemsInitialState = {
  id: {},

}