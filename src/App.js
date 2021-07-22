import "./App.css";
import "tailwindcss/dist/tailwind.css";
import React from "react";
import { AppNav, AppHome, AppAbout, AppRecipes, AppChef, AppNutrition, AppCocktail } from "./view/components/index";
import SignUp from './view/components/forms/SignUp'
import { Nav, Home } from "./view/components/index";
// >>>>>>> a907075f1b717cd5a6eada880005c018841b1a50
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
      </div>
      <Switch>
        <Route exact path={"/"} component={Home} />
        {/* <Route exact path={"/login"} component={} />
        <Route exact path={"/signup"} component={SignUp} />
        <Route exact path={"/user"} component={} />
        <Route exact path={"/user/owner"} component={} />  */}


        {/* <Route path={"/about"} component={AppAbout} />
        <Route path={"/chef"} component={AppChef} />
        <Route path={"/signup"} component={SignUpForm} />
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