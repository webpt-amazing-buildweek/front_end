import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { connect } from "react-redux";
import { postLogIn } from "../../../state/actions";
import SnackBarMsg from "../../../common/utils/SnackBarMsg";
// import "tailwindcss/dist/tailwind.css";
// import { AppNav, AppHome, AppAbout, AppRecipes, AppChef, AppNutrition, AppCocktail } from "./view/components/index";

const Schema = yup.object().shape({
  username: yup.string().required("User Name is Required"),
  password: yup.string().required("Not a valid Password")
});

function LoginForm(props) {
  const [loginState, setloginState] = useState(
    {
      username: "",
      password: ""
    }
  );

  const [err, setErr] = useState({
    username: "",
    password: ""
  });

  const [isValid, setIsValid] = useState(true);
  const [showAPIErr, setShowAPIErr] = useState(false);


  const history = useHistory();
  const handleAPIStatus=(isSuccessful)=>{
    if(isSuccessful){
      history.push("/marketplace");
    }
    else{
      setShowAPIErr(true);
    }
  }
  const formSubmit = (e) => {
    e.preventDefault();
    props.postLogIn(loginState, handleAPIStatus)
    // console.log("history push before api return",history.push);
    // history.push("/marketplace");
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
    <div className="parallax-wrapper4">
      <div className="flex flex-col text-center p-6 bg-white justify-center items-center" >
        {/* <h2>Login</h2> */}
        <form onSubmit={formSubmit} className={"w-full max-w-sm"}>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label htmlFor="username" className={"block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"}>
                  Username:
                </label>
              </div>
              <div className={"md:w-2/3"}>
                <input
                className={"bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-800"}
                  type="text"
                  placeholder="username"
                  id="username"
                  name="username"
                  value={loginState.username}
                  onChange={inputChange}
                  />
                  {err.username.length > 0 ? <p>{err.username}</p> : null}
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label htmlFor="password" className={"block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"}>
                  Password:
                </label>
              </div>
              <div className={"md:w-2/3"}>
                <input
                  className={"bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-800"}
                  type="password"
                  placeholder="Password"
                  id="password"
                  name="password"
                  value={loginState.password}
                  onChange={inputChange}
                  />
                  {err.password.length > 0 ? <p>{err.password}</p> :null}
              </div>
            </div>
            <div className="md:flex md:items-center">
              <div className="md:w-1/3"></div>
              <div className="md:w-2/3">
                <button className={"shadow bg-red-800 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"} type="submit" disabled={!isValid}>Log In</button>
              </div>
            </div>
        </form>
      </div>
    </div>
    {
      showAPIErr?
      <SnackBarMsg severity="error">Incorrect username or password</SnackBarMsg>
      :""
    }
  </div>
  );
}

const mapStateToProps = (state) => {
  return {
    numberOfSuccessCalls: state.api.postLogIn,
    status: state.api.postLogIn.status,
  }
}

const mapDispatchToProps = {
  postLogIn
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);