import { render,screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import ItemForm from "./ItemForm";
test("render without errors",()=>{
    render(
        <BrowserRouter>
            <ItemForm />
        </BrowserRouter>
    );
})
// item_name: "",
//     location: "",
//     quanitity: "",
//     price: "",
//     description: ""
//   }
test("can input fields",()=>{
    render(
        <BrowserRouter>
            <ItemForm />
        </BrowserRouter>
    );
    const item_name = screen.getByLabelText(/Item Name/i);
    const location = screen.getByLabelText(/location/i);
    const quanitity = screen.getByLabelText(/quanitity/i);
    const price = screen.getByLabelText(/price/i);
    const description = screen.getByLabelText(/description/i);
    expect(item_name).toBeInTheDocument();
    expect(location).toBeInTheDocument();
    expect(quanitity).toBeInTheDocument();
    expect(price).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    userEvent.type(item_name,"some name");
    userEvent.type(location,"somewhere");
    userEvent.type(quanitity,"1");
    userEvent.type(price,"10");
    userEvent.type(description, "some text");
    expect(item_name).toHaveValue("some name");
    expect(location).toHaveValue("somewhere");
    expect(quanitity).toHaveValue("1");
    expect(price).toHaveValue("10");
    expect(description).toHaveValue("some text");
    
})