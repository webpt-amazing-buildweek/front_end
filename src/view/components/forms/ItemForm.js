import React, { useState, useEffect } from "react";
import * as yup from "yup";
import {useParams } from "react-router-dom";


const schema = yup.object().shape({
    item_name: yup.string().required("Name of item required"),
    location: yup.string().required("Location required"),
    quantity: yup.number().required("Quantity is required").positive().integer(),
    price: yup.number().required("Price is required").positive(),
    description: yup.string().required("Description is required"),
    image_url:yup.string()
})

function ItemForm(props) {
  const {apiCall,initialForm} = props;
  const {id} = useParams();
  const [form, setForm] = useState(()=>{
    if(initialForm){
      return initialForm;
    }
    else{
      return {
        item_name: "",
        location: "",
        quantity: "",
        price: "",
        description: "",
        image_url:""
      };
    }
  }
  )

  const [errors, setErrors] = useState({
    item_name: "",
    location: "",
    quantity: "",
    price: "",
    description: "",
    image_url:""
  })

  const [disabled, setDisabled] = useState(true)

  const setFormErrors = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => setErrors({ ...errors, [name]: "" }))
      .catch((err) => setErrors({ ...errors, [name]: err.errors[0] }))
  }

  const handleChange = (event) => {
    const { name, value, type } = event.target;
    let valueToUse;
    if(type==="number"){
      if(name==="price"){
        valueToUse = parseFloat(value);
      }
      else{
        valueToUse = parseInt(value);
      }
    }
    else{
      valueToUse = value;
    }
    setFormErrors(name, valueToUse)
    setForm({ ...form, [name]: valueToUse })
  }

  const submit = (e) => {
    e.preventDefault();
    apiCall(form,id);
  }
  
  useEffect(() => {
  const validateForm = (schema, form, setDisabled) => {
      schema.isValid(form).then((valid) => setDisabled(!valid))
  }
    validateForm(schema, form, setDisabled)
}, [form])

  return (
    <div>
      <h2>Item Form</h2>
      <form onSubmit={submit}>
        <div>
          <label htmlFor="item_name">
            Item Name:
            <input
              type="text"
              placeholder="Item Name"
              id="item_name"
              name="item_name"
              value={form.item_name}
              onChange={handleChange}
            />
          </label>
          <div style={{ color: "red" }}>
            <div>{errors.item_name}</div>
          </div>
        </div>
        <div>
          <label htmlFor="location">
            Location:
            <input
              type="text"
              placeholder="location"
              id="location"
              name="location"
              value={form.location}
              onChange={handleChange}
            />
          </label>
          <div style={{ color: "red" }}>
            <div>{errors.location}</div>
          </div>
        </div>
        <div>
          <label htmlFor="quantity">
          quantity:
            <input
              type="number"
              placeholder="quantity"
              id="quantity"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
            />
          </label>
          <div style={{ color: "red" }}>
            <div>{errors.quantity}</div>
          </div>
        </div>
        <div>
          <label htmlFor="price">
          Price:
            <input
              type="number"
              placeholder="price"
              id="price"
              name="price"
              value={form.price}
              onChange={handleChange}
            />
          </label>
          <div style={{ color: "red" }}>
            <div>{errors.price}</div>
          </div>
        </div>
        <div>
          <label htmlFor="description">
          Description:
            <input
              type="text"
              placeholder="description"
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </label>
          <div style={{ color: "red" }}>
            <div>{errors.description}</div>
          </div>
        </div>
        <div>
          <label htmlFor="image_url">
            Image URL
            <input
              type="text"
              placeholder="url"
              id="image_url"
              name="image_url"
              value={form.image_url}
              onChange={handleChange}
            />
          </label>
          <div style={{ color: "red" }}>
            <div>{errors.image_url}</div>
          </div>
        </div>
        <button disabled={disabled}>
          Submit
        </button>
      </form>
    </div>
  )
}

export default ItemForm;