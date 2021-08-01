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
    setForm({
      item_name: "",
      location: "",
      quantity: "",
      price: "",
      description: "",
      image_url:""
    })
  }
  
  useEffect(() => {
  const validateForm = (schema, form, setDisabled) => {
      schema.isValid(form).then((valid) => setDisabled(!valid))
  }
    validateForm(schema, form, setDisabled)
}, [form])

  return (
  <form class="bg-white shadow-md rounded px-20 pt-2 pb-2 mb-4" style={{backgroundColor: '#b4a284', boxShadow: '0 0 1rem #000'}} onSubmit={submit}> 
    <div class="w-full max-w-lg">
      <div class="">
     
        <p class="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2">Add Item</p>
          <div class="flex space-x-4 flex-wrap -mx-3 mb-6">
            <div class="flex-auto mb-4" >
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="item_name">
              Item Name
              </label>
              <input
                class="shadow appearance-none block w-full bg-gray-200 text-gray-700 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                placeholder="item name"
                id="item_name"
                name="item_name"
                value={form.item_name}
                onChange={handleChange}
              />
              <div style={{ color: "red" }}>
                <div>{errors.item_name}</div>
              </div>
            </div>
            <div class="mb-4">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="location">
              Location
              </label>  
              <input
                class="shadow appearance-none block w-full bg-gray-200 text-gray-700 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                placeholder="location"
                id="location"
                name="location"
                value={form.location}
                onChange={handleChange}
              />
          
              <div style={{ color: "red" }}>
                <div>{errors.location}</div>
              </div>
            </div>
          </div>
          <div class="flex space-x-4 flex-wrap -mx-3 mb-6">
            <div class="mb-4"> 
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="quantity">
              Quantity
              </label>
              <input
                class="shadow appearance-none block w-full bg-gray-200 text-gray-700 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="number"
                placeholder="quantity"
                id="quantity"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
              />
          
              <div style={{ color: "red" }}>
                <div>{errors.quantity}</div>
              </div>
            </div>
            <div class="mb-4">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="price">
              Price
              </label>
              <input
                class="shadow appearance-none block w-full bg-gray-200 text-gray-700 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="number"
                placeholder="price"
                id="price"
                name="price"
                value={form.price}
                onChange={handleChange}
              />
              <div style={{ color: "red" }}>
                <div>{errors.price}</div>
              </div>
            </div>
          </div>
          <div class="flex space-x-4 flex-wrap -mx-3 mb-6">
            <div class="mb-4">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="description">
              Description
              </label>
              <input
                class="shadow appearance-none block w-full bg-gray-200 text-gray-700 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                placeholder="description"
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
              />
              <div style={{ color: "red" }}>
                <div>{errors.description}</div>
              </div>
            </div>
            <div class="mb-4"> 
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="image_url">
              Image URL
              </label>  
              <input
                class="shadow appearance-none block w-full bg-gray-200 text-gray-700 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                placeholder="url"
                id="image_url"
                name="image_url"
                value={form.image_url}
                onChange={handleChange}
              />
              <div style={{ color: "red" }}>
                <div>{errors.image_url}</div>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" disabled={disabled}>
          Submit
        </button>
        </div>
     
      </div>
    </div>
  </form>
  )
}

export default ItemForm;