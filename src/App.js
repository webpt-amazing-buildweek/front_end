import "./App.css";
import "tailwindcss/dist/tailwind.css";
import React from "react";
import { AppNav, AppHome, AppAbout, AppRecipes, AppChef, AppNutrition, AppCocktail, ItemsList } from "./view/components/index";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


function App() {
  return (
    <Router>
      <div className="App">
        <AppNav />
      </div>
      <Switch>
        <Route exact path={"/"} component={AppHome} />
        <Route path={"/about"} component={AppAbout} />
        <Route path={"/chef"} component={AppChef} />
        <Route path={"/recipes"} component={AppRecipes} />
        <Route path={'/nutrition'} component={AppNutrition}/>
        <Route path={'/cocktails'} component={AppCocktail}/>
        <Route path={'/items-list'} component={ItemsList} />
      </Switch>
    </Router>
  );
}

export default App;
