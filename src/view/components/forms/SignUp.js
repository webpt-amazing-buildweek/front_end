import React, {useState, useEffect} from "react";
import {Link, useHistory} from "react-router-dom";

const displayErrors=(formErrors)=>{
    return Object.keys(formErrors).map((key, i) => formErrors[key] === '' ? '' : <div key={i}> {formErrors[key]} </div>);
};

const handleChangeHelper=({event, schema, formValues, setFormValues, formErrors, setFormErrors, setIsValid})=>{
    const {name, value, checked, type} = event.target;
    const inputValue = type === 'checkbox' ? checked:value;
    const newFormValues = {...formValues, [name]: inputValue};
    validateField(schema, name, inputValue, formErrors, setFormErrors); 
    validateForm(schema, newFormValues, setIsValid);
    setFormValues(newFormValues);
};



const handleSubmitHelper = (event) => {
    event.preventDefault();
};


const signUpFormSchema = yup.object().shape({
    name:yup.string().required(isRequired('Name')),
    email:yup.string().email(invalidEmail).required(isRequired('Email')),
    isOwner:yup.boolean(),
    password:yup.string().min(8,'Password must have at least 8 characters').required(isRequired('Password')),
});

const validateForm=(schema,formValues,setIsValid)=>{
    schema.isValid(formValues)
    .then((valid)=>setIsValid(valid));
};

const initialValues = {
    name: "",
    email: "",
    password: "",
    isOwner: false,
    is_instructor: false,
};

const initialErrorValues = Object.keys(initialValues).reduce((acc, key) => {
    acc[key] = "";
    return acc;
}, {});

function SignUp(props) {
    const history = useHistory();
    const [isValid, setIsValid] = useState(true);
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState(initialErrorValues);


    useEffect(() => {
        validateForm(signUpFormSchema, formValues, setIsValid); 
    }, [formValues]);

    const handleChange = (event) => {
        handleChangeHelper({
            event,
            schema: signUpFormSchema,
            formValues,
            setFormValues,
            formErrors,
            setFormErrors,
            setIsValid
        });
    };

    const handleSubmit = (event) => {
        handleSubmitHelper(event);
        props.addNewUser(formValues);
        history.push("/login");
    };

    
    return (
        <div>
            <div>
                <form
                    onSubmit={handleSubmit}
                >
                    <div>
                        <h2>Sign Up</h2>
                        <label>
                            Name:{" "}
                            <input
                                id="sign-up-form-name"
                                type="text"
                                name="name"
                                value={formValues.name}
                                onChange={handleChange}
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
                        />
                        
                        <button type="submit" disabled={!isValid}>
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



export default SignUp;