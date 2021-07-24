import { render,screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import SignUp from "./SignUp";
test("render without errors",()=>{
    render(
        <BrowserRouter>
            <SignUp />
        </BrowserRouter>
    );
})
test("can input fields",()=>{
    render(
        <BrowserRouter>
            <SignUp />
        </BrowserRouter>
    );
    const name = screen.getByLabelText(/name/i);
    const email = screen.getByLabelText(/email/i);
    const password = screen.getByLabelText(/password/i);
    const isOwner = screen.getByRole('checkbox');
    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(isOwner).toBeInTheDocument();
    userEvent.type(name,"lambda");
    userEvent.type(email,"lambda@gmail.com");
    userEvent.type(password,"1234567");
    userEvent.click(isOwner);
    expect(name).toHaveValue("lambda");
    expect(email).toHaveValue("lambda@gmail.com");
    expect(password).toHaveValue("1234567");
    expect(isOwner).toBeChecked();
    
})

