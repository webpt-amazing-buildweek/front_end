import "./App.css";
import "tailwindcss/dist/tailwind.css";
import React, { useEffect } from "react";
import { Nav, Home, SignUp, LogIn } from "./view/components/index";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./view/PrivateRoute";
import {connect} from "react-redux";
import { checkUserAuth } from "./state/actions";

function App(props) {
  const {checkUserAuth} = props;
  useEffect(()=>{
    checkUserAuth();
  },[checkUserAuth]);
  return (
    <Router>
      <div className="App">
        <Nav />
      </div>
      <Switch>
        <Route exact path={"/"} component={Home} />
        <Route exact path={"/login"} component={LogIn} />
        <Route exact path={"/signup"} component={SignUp} />
        <PrivateRoute />
        {/* <Route exact path={"/user/owner"} component={} />  */}


        {/* <Route path={"/about"} component={AppAbout} /> */}
        {/* <Route path={"/chef"} component={AppChef} />
        <Route path={"/recipes"} compone         nt={AppRecipes} />
        <Route path={'/nutrition'} component={AppNutrition}/>
        <Route path={'/cocktails'} component={AppCocktail}/> */}


        
      </Switch>
    </Router>
  );
}
const mapDispatchToProps=(dispatch)=>{
  return {
    checkUserAuth:()=>dispatch(checkUserAuth())
  }
};
export default connect(null,mapDispatchToProps)(App);

// Public routes
// /home
// /login
// /signup
// /items/:id  //stretch goal


// Private routes
// /user  //display all items
// /user/owner //only display owned items
// /cart //stretch goal