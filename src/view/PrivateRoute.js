import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import {connect} from "react-redux";
import {Marketplace,MyItem} from "./components/index";
// Template Created 
const PrivateRoute = (props) => {
    if (localStorage.getItem("authToken")) {
        // render the component and pass props
        const {isOwner} = props;
        console.log(isOwner);
        if(isOwner){
            return(
                <Switch>
                    <Route path="/marketplace" {...props} component={Marketplace} />
                    <Route path="/myitems" {...props} component={MyItem} />
                    <Route path="/">
                        <Redirect to="/" />
                    </Route>
                </Switch>
            );
        }
        else{
            return(
                <Switch>
                    <Route path={"/marketplace"} {...props} component={Marketplace} />
                    <Route path="/">
                        <Redirect to="/" />
                    </Route>
                </Switch>
            )
        }
    }
    //Redirects to the the home page
    return (
        <Redirect to="/" />
    )
}
const mapStateToProps = (state) =>{
    return {
        isOwner: state.user.isOwner
    };
};
export default connect(mapStateToProps)(PrivateRoute);
