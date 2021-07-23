import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
// import "tailwindcss/dist/tailwind.css";
// import { AppNav, AppHome, AppAbout, AppRecipes, AppChef, AppNutrition, AppCocktail } from "./view/components/index";

const Schema = yup.object().shape({
  email: yup.string().required("Email is Required"),
  password: yup.string().required("Not a valid Password")
});

function loginForm() {
  const [loginState, setloginState] = useState([
    {
      email: "",
      password: ""
    }
  ]);

  const [err, setErr] = useState({
    email: "",
    password: ""
  });

  const [isValid, setIsValid] = useState(true);

  const history = useHistory();

  const formSubmit = (e) => {
    e.preventDefault();

    history.push("/user")
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

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={formSubmit}>
        <p>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            placeholder="Email"
            id="email"
            name="email"
            value={loginState.email}
            onChange={inputChange}
          />
          {err.email.length > 0 ? <p>{err.email}</p> : null}
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

export default loginForm;