import "./App.css";
import "tailwindcss/dist/tailwind.css";
import React, { useEffect } from "react";
import { Nav, Home } from "./view/components/index";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {useDispatch} from "react-redux";
import {createUser} from "./state/actions";

// const dummyLogIn = {
//   username:"chris",
//   password:"123456789"
// };
const dummySignUp = {
  username:"chris",
  password:"123456789",
  isOwner:true
};


function App() {
  // this code is for testing api. remove later----
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(createUser(dummySignUp));
  },[dispatch])
  // --------
  return (
    <Router>
      <div className="App">
        <Nav />
      </div>
      <Switch>
        <Route exact path={"/"} component={Home} />
        {/* <Route exact path={"/login"} component={} />
        <Route exact path={"/signup"} component={} />
        <Route exact path={"/user"} component={} />
        <Route exact path={"/user/owner"} component={} />  */}


        {/* <Route path={"/about"} component={AppAbout} />
        <Route path={"/chef"} component={AppChef} />
        <Route path={"/recipes"} component={AppRecipes} />
        <Route path={'/nutrition'} component={AppNutrition}/>
        <Route path={'/cocktails'} component={AppCocktail}/> */}


        
      </Switch>
    </Router>
  );
}

export default App;

// Public routes
// /home
// /login
// /signup
// /items/:id  //stretch goal


// Private routes
// /user  //display all items
// /user/owner //only display owned items
// /cart //stretch goal