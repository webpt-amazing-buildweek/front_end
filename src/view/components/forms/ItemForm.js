import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { useHistory } from "react-router-dom";


const schema = yup.object().shape({
    item_name: yup.string().required("Name of item required"),
    location: yup.string().required("Location required"),
    quanitity: yup.number().required("Quantity is required").positive().integer(),
    price: yup.number().required("Price is required").positive(),
    description: yup.string().required("Description is required"),
})

function ItemForm() {
  const [form, setForm] = useState(
    {
      item_name: "",
      location: "",
      quanitity: "",
      price: "",
      description: ""
    }
  )

  const [errors, setErrors] = useState({
    item_name: "",
    location: "",
    quanitity: "",
    price: "",
    description: ""
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
    const { name, value } = event.target
    const valueToUse = value

    setFormErrors(name, valueToUse)
    setForm({ ...form, [name]: valueToUse })
  }

  const history = useHistory()

  const submit = (e) => {
    e.preventDefault()
    history.push("/user")
  }

  

  
  useEffect(() => {
  const validateForm = (schema, form, setDisabled) => {
      schema.isValid(form).then((valid) => setDisabled(!valid))
  }
    validateForm(schema, form, setDisabled)
}, [form])

  return (
    <div>
      <h2>Items List</h2>
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
          <label htmlFor="quanitity">
          Quanitity:
            <input
              type="text"
              placeholder="quanitity"
              id="quanitity"
              name="quanitity"
              value={form.quanitity}
              onChange={handleChange}
            />
          </label>
          <div style={{ color: "red" }}>
            <div>{errors.quanitity}</div>
          </div>
        </div>
        <div>
          <label htmlFor="price">
          Price:
            <input
              type="text"
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
        <button disabled={disabled}>
          Submit
        </button>
      </form>
    </div>
  )
}

export default ItemForm;