import { ITEMS_RECEIVED, ITEM_CREATED, ITEM_DELETED, ITEM_UPDATED } from '../actionTypes';
import {itemsInitialState} from '../_shared/store/index';



//Actions

//setUser






//Reducer
export const itemsReducer = (state = itemsInitialState, action) => {
  //3. initialize switch statement
  switch (action.type) {
    case ITEMS_RECEIVED: {
      // convert an array to an object with item id as keys
      const items = action.payload.reduce((acc,item)=>{
        acc[item.id] = item;
        return acc;
      },{});
      return items;
    }
    case ITEM_CREATED: {
      // expect backend to return the new item
      const {id,name,description,location,price} = action.payload;
      return {
        ...state,
        [id]:{id,name,description,location,price}
      };
    }
    case ITEM_UPDATED: {
      // expect backend to return the new item
      const {id,name,description,location,price} = action.payload;
      return {
        ...state,
        [id]:{id,name,description,location,price}
      };
    }
    case ITEM_DELETED: {
      // filter out the id deleted
      const {id} = action.payload;
      const ids = Object.keys(state).filter(key=>key!==id);
      const items = ids.reduce((acc,id)=>{
        acc[id] = state[id];
        return items;
      },{});
      return state;
    }
    default:
      return state;
  }
};