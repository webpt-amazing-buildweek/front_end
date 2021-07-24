import {
    testResponse,
    postLogIn,
    createUser,
    getItems,
    createItem,
    updateItem,
    deleteItem
} from "./api";
import {render,screen} from "@testing-library/react";
const dispatch = jest.fn().mockImplementation((action)=>{
    if(typeof action === "function"){
        action(dispatch);
    }
    console.log(`action: ${action.type}, payload: ${action.payload}`);
    // render(<div>`action: ${action.type}, payload: ${action.payload}`</div>);
});

test("call testReponse without error",()=>{
    dispatch(testResponse());
    screen.findByText("action");
});
test("call creatUser without error",()=>{
    dispatch(createUser({
        username:"lambda",
        password:"school123456",
        email:"lambda@gmail.com",
        isOwner:true
    }));
    screen.findByText("action");
});
// test("call postLogIn without error",()=>{
//     dispatch(postLogIn({
//         username: 'loki', 
//         password: 'password'
//     }));
// });
// test("call getItems without error",()=>{
//     dispatch(getItems());
// });
// test("call createItem without error",()=>{
//     dispatch(createItem({
//         item_name:"something",
//         location:"somewhere",
//         quantity:1,
//         price:1,
//         description:"some text"
//     }));
// });
// test("call updateItem without error",()=>{
//     dispatch(updateItem({
//         item_name:"something mod",
//         location:"somewhere mod",
//         quantity:1,
//         price:1,
//         description:"some text mod"
//     },1));
// });
// test("call deleteItem without error",()=>{
//     dispatch(deleteItem(1));
// });
