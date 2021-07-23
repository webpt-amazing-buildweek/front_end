import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LogIn from "./LogIn";
test("render without errors",()=>{
    render(
        <BrowserRouter>
            <LogIn />
        </BrowserRouter>
    );
})