import React, { useState, useEffect } from "react";
import axios from "axios";
import repos from "../../../repos.json";
import DevelopersInput from "../../shared/DevelopersInput";
import InputField from "./InputField";
import DropdownField from "./DropdownField";

const initialProduct = {
  productName: "",
  scrumMasterName: "",
  productOwnerName: "",
  developers: "",
  startDate: "",
  methodology: "",
  location: "",
};

const initialErrors = {
  productName: "",
  scrumMasterName: "",
  productOwnerName: "",
  startDate: "",
  methodology: "",
  developers: "",
  location: "",
};

const ProductForm = () => {
  const [product, setProduct] = useState(initialProduct);
  const [developers, setDevelopers] = useState([]);
  const [errors, setErrors] = useState(initialErrors);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const htmlUrls = repos.map((item) => item.html_url);
    setLocations(htmlUrls);
  }, []);

  const handleChildError = (error) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      error,
    }));
  };

  // Event handler for input fields change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [id]: value }));
  };

  // Function to set errors for specific fields
  const setError = (field, error) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: error,
    }));
  };

  // Function to validate the form
  const validateForm = () => {
    let valid = true;

    Object.entries(product).forEach(([key, value]) => {
      if (!value && key !== "developers") {
        setError(key, `${key} is required`);
        valid = false;
      } else {
        setError(key, "");
      }
    });

    if (developers.length === 0) {
      setError("developers", "Developers are required");
      valid = false;
    }

    return valid;
  };

  // Event handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setMessage({ type: "error", text: "Please fill in all required fields" });
      return;
    }

    const productWithDevelopers = { ...product, developers };

    try {
      await axios.post(
        "http://localhost:3000/api/product/addProduct",
        productWithDevelopers
      );
      setMessage({ type: "success", text: "Product added successfully!" });
      setProduct(initialProduct);
      setDevelopers([]);
      setErrors(initialProduct);
    } catch (error) {
      if (error.response) {
        setMessage({ type: "error", text: error.response.data.message });
      } else {
        setMessage({
          type: "error",
          text: "Failed to add product. API is not working.",
        });
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-4 bg-white shadow-lg rounded-lg overflow-hidden">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
      {message.type === "success" && (
        <div className="bg-green-200 text-green-800 py-2 px-4 mb-4">
          {message.text}
        </div>
      )}
      {message.type === "error" && (
        <div className="bg-red-200 text-red-800 py-2 px-4 mb-4">
          {message.text}
        </div>
      )}
      <form className="" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <InputField
            label="Product Name"
            id="productName"
            type="text"
            value={product.productName}
            onChange={handleChange}
            required
            error={errors.productName}
            className="col-span-2"
          />
          <InputField
            label="Scrum Master"
            id="scrumMasterName"
            type="text"
            value={product.scrumMasterName}
            onChange={handleChange}
            required
            error={errors.scrumMasterName}
          />
          <InputField
            label="Product Owner"
            id="productOwnerName"
            type="text"
            value={product.productOwnerName}
            onChange={handleChange}
            required
            error={errors.productOwnerName}
          />
          <DevelopersInput
            developers={developers}
            setDevelopers={setDevelopers}
            handleError={handleChildError}
          />
          <InputField
            label="Start Date"
            id="startDate"
            type="date"
            value={product.startDate}
            onChange={handleChange}
            required
            error={errors.startDate}
          />
          <DropdownField
            label="Location"
            id="location"
            value={product.location}
            onChange={handleChange}
            required
            error={errors.location}
            options={locations}
          />
          <div className="mb-4 col-span-2">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="methodology"
            >
              Methodology:
            </label>
            <select
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
        {{errors.methodology ? 'border-red-500' : ''}}"
              id="methodology"
              value={product.methodology}
              onChange={handleChange}
              required
            >
              <option value="">Select Methodology</option>
              <option value="Agile">Agile</option>
              <option value="Waterfall">Waterfall</option>
            </select>
            {errors.methodology && (
              <p className="text-red-500 text-xs mt-1">{errors.methodology}</p>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="inline-flex justify-center px-4 py-2 text-sm font-medium border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 text-blue-900 bg-blue-100 hover:bg-blue-200 focus-visible:ring-blue-500"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
