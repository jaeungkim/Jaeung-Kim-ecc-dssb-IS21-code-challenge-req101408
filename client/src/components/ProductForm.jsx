import React, { useState } from "react";
import axios from "axios";

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
          className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
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

const ProductForm = () => {
  // Initial state for the product object
  const initialProduct = {
    productName: "",
    scrumMasterName: "",
    productOwnerName: "",
    developers: "",
    startDate: "",
    methodology: "",
  };

  // Initial state for errors object
  const initialErrors = {
    productName: "",
    scrumMasterName: "",
    productOwnerName: "",
    startDate: "",
    methodology: "",
    developers: "",
  };

  // State for number of developers
  const [numDevelopers, setNumDevelopers] = useState(0);
  // State for the product object
  const [product, setProduct] = useState(initialProduct);
  // State for errors object
  const [errors, setErrors] = useState(initialErrors);
  // State for messages
  const [message, setMessage] = useState({ type: "", text: "" });

  // Event handler for input fields change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [id]: value }));
  };

  // Event handler for developers input field change
  const handleDevelopersChange = (e) => {
    const { value } = e.target;
    const developers = value.split(",").map((developer) => developer.trim());
    if (developers.length > 5) {
      setError("developers", "No more than 5 developers are allowed");
    } else {
      setError("developers", "");
    }
    setProduct((prevProduct) => ({ ...prevProduct, developers: value }));
    setNumDevelopers(developers.length);
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

    if (product.developers.trim() === "") {
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
    <div className="max-w-md mx-auto px-6 py-4 bg-white shadow-lg rounded-lg overflow-hidden">
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
          <InputField
            label="Developers"
            id="developers"
            type="text"
            value={product.developers}
            onChange={handleDevelopersChange}
            required
            error={errors.developers}
            tooltip="Separate multiple developer names with commas"
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
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
            numDevelopers > 5 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={numDevelopers > 5}
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
