import Marketplace from "./Marketplace";
import {render, screen} from "@testing-library/react";
import { Provider } from 'react-redux';
import { createStore } from "redux";
import { rootReducer } from "../../state/rootReducer";
import axios from "axios";

jest.mock("axios");

const items = [
    {
      id:0,
      item_name:"something 0",
      location:"somewhere 0",
      quantity:0,
      price:0,
      description:"some text 0",
      user_id:0
    },
    {
      id:1,
      item_name:"something 1",
      location:"somewhere 1",
      quantity:1,
      price:1,
      description:"some text 1",
      user_id:1
    },
    {
      id:2,
      item_name:"something 2",
      location:"somewhere 2",
      quantity:2,
      price:2,
      description:"some text 2",
      user_id:2
    },
    {
      id:3,
      item_name:"something 3",
      location:"somewhere 3",
      quantity:3,
      price:3,
      description:"some text 3",
      user_id:3
    },
    {
      id:4,
      item_name:"something 4",
      location:"somewhere 4",
      quantity:4,
      price:4,
      description:"some text 4",
      user_id:4
    },
];

axios.get.mockResolvedValue(items);

const store = createStore(rootReducer);

test("render without error",()=>{
    render(
    <Provider store={store}>
        <Marketplace/>
    </Provider>    
    );
});