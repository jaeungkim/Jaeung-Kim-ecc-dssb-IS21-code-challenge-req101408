import React, { useState, useEffect } from "react";
import axios from "axios";
import repos from "../repos.json";
import DevelopersInput from "./DevelopersInput";

// InputField component to handle input fields
const InputField = ({
  label,
  id,
  type,
  value,
  onChange,
  required,
  error,
  tooltip,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2" htmlFor={id}>
        {label}:
      </label>
      <div className="relative">
        <input
          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
            error ? "border-red-500" : ""
          }`}
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          onFocus={() => setShowTooltip(true)}
          onBlur={() => setShowTooltip(false)}
        />
        {tooltip && (
          <div
            className={`${
              showTooltip ? "visible" : "invisible"
            } absolute z-10 text-gray-800 bg-gray-100 border border-gray-300 rounded py-1 px-2`}
            style={{ maxWidth: "200px" }}
          >
            <span>{tooltip}</span>
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

const DropdownField = ({
  label,
  id,
  value,
  onChange,
  required,
  error,
  options,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2" htmlFor={id}>
        {label}:
      </label>
      <div className="relative">
        <select
          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
            error ? "border-red-500" : ""
          }`}
          id={id}
          value={value}
          onChange={onChange}
          required={required}
        >
          <option value="">Select Repository Link</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    </div>
  );
};

const ProductForm = () => {
  // Initial state for the product object
  const initialProduct = {
    productName: "",
    scrumMasterName: "",
    productOwnerName: "",
    developers: "",
    startDate: "",
    methodology: "",
    location: "",
  };

  // Initial state for errors object
  const initialErrors = {
    productName: "",
    scrumMasterName: "",
    productOwnerName: "",
    startDate: "",
    methodology: "",
    developers: "",
    location: "",
  };

  // State for number of developers
  const [numDevelopers, setNumDevelopers] = useState(0);
  // State for the product object
  const [product, setProduct] = useState(initialProduct);
  // State for developers
  const [developers, setDevelopers] = useState([]);
  // State for errors object
  const [errors, setErrors] = useState(initialErrors);
  // State for messages
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

    try {
      await axios.post("http://localhost:3000/api/product/addProduct", product);
      setMessage({ type: "success", text: "Product added successfully!" });
      setProduct(initialProduct);
      setErrors(initialErrors);
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
          className={`inline-flex justify-center px-4 py-2 text-sm font-medium border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
            errors
              ? "text-gray-500 bg-gray-200"
              : "text-blue-900 bg-blue-100 hover:bg-blue-200 focus-visible:ring-blue-500"
          }`}
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
