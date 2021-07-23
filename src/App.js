import "./App.css";
import "tailwindcss/dist/tailwind.css";
import React , { useEffect }from "react";
import { Nav, Home, User, SignUp } from "./view/components/index";
import PrivateRoute from "./view/PrivateRoute";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {useDispatch} from "react-redux";
import {createUser} from "./state/actions";
import axios from 'axios';
import { testResponse } from "./state/_shared/middleware/api";
// const dummyLogIn = {
//   username:"chris",
//   password:"123456789"
// };
const dummySignUp = {
  username:"chris",
  password:"123456789",
  email: "cool@cmail.com",
  isOwner:true
};


function App() {
  // this code is for testing api. remove later----
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(testResponse());
  },[dispatch])
  // axios.get("http://localhost:5000")
  // .then((res)=>{
  //   console.log("!!!!!!!!!!!!!!!!!!!",res)
  // })
  // .catch((err)=>{
  //   console.log({err});
  // })
  // },[])
  // --------
  return (
    <Router>
      <div className="App">
        <Nav />
      </div>
      <Switch>
        <Route exact path={"/"} component={Home} />
        {/* <Route exact path={"/login"} component={} /> */}
        <Route exact path={"/signup"} component={SignUp} />
        <Route exact path={"/user"} component={User} />
        {/* <Route exact path={"/user/owner"} component={} />  */}


        {/* <Route path={"/about"} component={AppAbout} /> */}
        {/* <Route path={"/chef"} component={AppChef} />
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