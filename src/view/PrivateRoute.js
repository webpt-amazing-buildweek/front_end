import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import {connect} from "react-redux";
import {Cart, Marketplace,MyItem} from "./components/index";
import Checkout from "./components/Checkout";

// Template Created 
const PrivateRoute = (props) => {
    if (localStorage.getItem("authToken")) {
        // render the component and pass props
        const {isOwner} = props;
        if(isOwner){
            // Switch is needed whenever needs to only render one route.
            // even though PrivateRoute is a child of the Switch in App.js
            return(
                <Switch>
                    <Route path="/marketplace" {...props} component={Marketplace} />
                    <Route path="/myitems" {...props} component={MyItem} />
                    <Redirect path="/" to={"/"}/>
                </Switch>
            );
        }
        else{
            return(
                <Switch>
                    <Route path={"/marketplace"} {...props} component={Marketplace} />
                    <Route path={"/cart"} {...props} component={Cart} />
                    <Route path={"/checkout"} {...props} component={Checkout} />
                    <Redirect path="/" to={"/"}/>
                </Switch>
            )
        }
    }
    return (
        <Switch>
            <Route path={"/marketplace"} {...props} component={Marketplace} />
            <Route path={"/cart"} {...props} component={Cart} />
            <Redirect path="/checkout" to={"/login"}/>
            <Redirect path="/" to={"/"}/>
        </Switch>
    )
}
const mapStateToProps = (state) =>{
    return {
        isOwner: state.user.isOwner
    };
};
export default connect(mapStateToProps)(PrivateRoute);
