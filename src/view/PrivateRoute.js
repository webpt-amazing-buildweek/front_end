import React from "react";
import { Route, Redirect } from "react-router-dom";

// Template Created 
const PrivateRoute = (props) => {
    if (localStorage.getItem("token")) {
        // render the component and pass props
        return (
            <Route {...props} />
        )
    }
    //Redirects to the the home page
    return (
        <Redirect to="/" />
    )
}

export default PrivateRoute;
