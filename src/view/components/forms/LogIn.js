import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { connect } from "react-redux";
import { postLogIn } from "../../../state/actions"
// import "tailwindcss/dist/tailwind.css";
// import { AppNav, AppHome, AppAbout, AppRecipes, AppChef, AppNutrition, AppCocktail } from "./view/components/index";

const Schema = yup.object().shape({
  username: yup.string().required("Email is Required"),
  password: yup.string().required("Not a valid Password")
});

function LoginForm(props) {
  const [loginState, setloginState] = useState([
    {
      username: "",
      password: ""
    }
  ]);

  const [err, setErr] = useState({
    username: "",
    password: ""
  });

  const [isValid, setIsValid] = useState(true);

  const history = useHistory();

  const formSubmit = (e) => {
    e.preventDefault();
    props.postLogIn(loginState, handleAPIStatus)
    history.push("/marketplace")
  };

  const validate = (e) => {
  yup.reach(Schema, e.target.name)
     .validate(e.target.value)
     .then( valid => {
        setErr({
          ...err, [e.target.name]: ""
        })
        setIsValid(valid);
     })
     .catch( error => {
       console.log(error.errors)
       setErr({
        ...err, [e.target.name]: error.errors[0]
       })
     })
  };

  const inputChange = (e) => {
    e.persist();
    validate(e);
    setloginState({ ...loginState, [e.target.name]: e.target.value });
  };

  
  const handleAPIStatus=(isSuccessful)=>{
    console.log('API handled', isSuccessful)
    if(isSuccessful){
    history.push("/marketplace")
    // console.log(history)
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={formSubmit}>
        <p>
        <label htmlFor="username">
          Username:
          <input
            type="username"
            placeholder="username"
            id="username"
            name="username"
            value={loginState.username}
            onChange={inputChange}
          />
          {err.username.length > 0 ? <p>{err.username}</p> : null}
        </label></p>
        <p>
        <label htmlFor="password">
        Password:
          <input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            value={loginState.password}
            onChange={inputChange}
          />
          {err.password.length > 0 ? <p>{err.password}</p> :null}
        </label></p>
        <button type="submit" disabled={!isValid}>Log In</button>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    numberOfSuccessCalls: state.api.postLogIn,
    status: state.api.postLogIn.status
  }
}

const mapDispatchToProps = {
  postLogIn
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);