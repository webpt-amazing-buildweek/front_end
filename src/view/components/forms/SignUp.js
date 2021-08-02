import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import * as yup from 'yup'
import { connect } from "react-redux"
import { createUser } from "../../../state/actions";

const signUpFormSchema = yup.object().shape({
    username:yup.string().required('Name'),
    email:yup.string().email().required('Email'),
    isOwner:yup.boolean(),
    password:yup.string().min(8,'Password must have at least 8 characters').required('Password')
});

const initialValues = {
    username: "",
    email: "",
    password: "",
    isOwner: false
};

const initialErrorValues = Object.keys(initialValues).reduce((acc, key) => {
    acc[key] = "";
    return acc;
}, {});

function SignUp(props) {
    const history = useHistory();
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState(initialErrorValues);

    const displayErrors=(formErrors)=>{
        return Object.keys(formErrors).map((key, i) => formErrors[key] === '' ? '' : <div key={i}> {formErrors[key]} </div>);
    };
    const validate = (name,value) => {
        yup.reach(signUpFormSchema,name)
           .validate(value)
           .then( valid => {
              setFormErrors((prevErr)=>({
                ...prevErr, [name]: ""
              }))
           })
           .catch( error => {
             setFormErrors((prevErr)=>({
              ...prevErr, [name]: error.errors[0]
             }))
           })
        };

    const handleChange = (event) => {
        const {name, value, checked, type} = event.target;
        const inputValue = type === 'checkbox' ? checked:value;
        const newFormValues = {...formValues, [name]: inputValue};
        setFormValues(newFormValues);
    };

    const handleSubmit = async(event) => {
        event.preventDefault();
        const valid = await signUpFormSchema.isValid(formValues);
        if(valid){
            props.createUser(formValues);
            history.push("/login");
        }
        else{
            for(let name in formValues){
                validate(name,formValues[name]);
            }
        }
    };

    return (
        <div className={"flex flex-col text-center"}>
            <div className={"parallax-wrapper2 self-center text-black mt-96"}
            style={{background: '#e06706'}}
            >
                <form className={"signup-form"}
                    onSubmit={handleSubmit}
                >
                    <div className={'flex flex-col  text-center'}>
                        <h2 style={{fontSize: '4rem', color: '#3c1c07', textShadow: '0 0 1rem black'}}>Sign Up</h2>
                        <label>
                            Name:{" "}
                            <input
                                id="sign-up-form-name"
                                type="text"
                                name="username"
                                value={formValues.username}
                                onChange={handleChange}
                                className={'input'}
                            />
                        </label>
                        <label>
                            Email:{" "}
                            <input
                                id="sign-up-form-email"
                                type="text"
                                name="email"
                                value={formValues.email}
                                onChange={handleChange}
                                className={'input'}
                            />
                        </label>
                        <label>
                            Password:
                            <input
                                id="sign-up-form-password"
                                type="password"
                                name="password"
                                value={formValues.password}
                                onChange={handleChange}
                                className={'input'}
                            />
                        </label>

                        <label >
                            Are you an owner?</label>
                        <input
                            id="sign-up-form-18-plus"
                            type="checkbox"
                            name="isOwner"
                            checked={formValues.isOwner}
                            onChange={handleChange}
                            className={'input'}
                        />
                        
                        <button type="submit">
                            Sign Up
                        </button>
                        {displayErrors(formErrors)}{" "}
                        <Link to="login"> Login{" "} </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
  return {
    api: state.api.createUser
  }
}


const mapDispatchToProps = {
  createUser
}


export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
