import React, { useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import ProductSearch from "./ProductSearch";
import axios from "axios";
import repos from "../repos.json";
import DevelopersInput from "./DevelopersInput";

// The ProductList component displays a list of products with their details
const ProductList = () => {
  // State management for various properties
  const [products, setProducts] = useState([]); // List of products
  const [editingProduct, setEditingProduct] = useState(null); // Product being edited
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [scrumMasterSearchText, setScrumMasterSearchText] = useState(""); // Scrum master search text
  const [developerSearchText, setDeveloperSearchText] = useState(""); // Developer search text
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered list of products
  const [apiError, setApiError] = useState(false); // API error flag
  const [locations, setLocations] = useState([]);

  // Handles clicking the edit button for a product
  const handleEditClick = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  // Updates a product by making a PUT request to the API
  const updateProduct = async (updatedProduct) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/product/${updatedProduct.productId}`,
        updatedProduct
      );
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.productId === updatedProduct.productId
            ? updatedProduct
            : product
        )
      );
      setEditingProduct(null);
      setApiError(false);
    } catch (error) {
      console.error(error);
      setApiError(true);
    }
  };

  // Fetches products data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/api/product");
        setProducts(data);
        setApiError(false);
      } catch (error) {
        console.error(error);
        setApiError(true);
      }
    };
    fetchData();
  }, []);

  // Filters the list of products based on search criteria
  useEffect(() => {
    const filtered = products.filter((product) => {
      const scrumMasterMatch =
        scrumMasterSearchText === "" ||
        product.scrumMasterName
          .toLowerCase()
          .includes(scrumMasterSearchText.toLowerCase());
      const developerMatch =
        developerSearchText === "" ||
        product.developers.some((dev) =>
          dev.toLowerCase().includes(developerSearchText.toLowerCase())
        );
      return scrumMasterMatch && developerMatch;
    });
    setFilteredProducts(filtered);
  }, [scrumMasterSearchText, developerSearchText, products]);

  const totalProductsCount = filteredProducts.length;

  useEffect(() => {
    const htmlUrls = repos.map((item) => item.html_url);
    setLocations(htmlUrls);
  }, []);

  // Renders the component UI
  return (
    <div className="container mx-auto mt-4">
      {apiError && (
        <div className="bg-red-200 p-4 mb-4 border-l-4 border-red-500 text-red-700">
          <p>
            Error: Unable to fetch or update data from the API. Please try again
            later.
          </p>
        </div>
      )}
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg font-bold">
          Total Number of Products: {totalProductsCount}
        </p>
        <ProductSearch
          scrumMasterSearchText={scrumMasterSearchText}
          setScrumMasterSearchText={setScrumMasterSearchText}
          developerSearchText={developerSearchText}
          setDeveloperSearchText={setDeveloperSearchText}
        />
      </div>
      <div className="overflow-x-auto w-full">
        <table className="table-responsive table-auto border-collapse border border-gray-500">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Number</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Scrum Master</th>
              <th className="px-4 py-2">Product Owner</th>
              <th className="px-4 py-2">Developer Names</th>
              <th className="px-4 py-2">Start Date</th>
              <th className="px-4 py-2">Methodology</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.productId} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{product.productId}</td>
                <td className="border px-4 py-2">{product.productName}</td>
                <td className="border px-4 py-2">{product.scrumMasterName}</td>
                <td className="border px-4 py-2">{product.productOwnerName}</td>
                <td className="border px-4 py-2">
                  {product.developers.join(", ")}
                </td>
                <td className="border px-4 py-2">
                  {product.startDate && product.startDate.slice(0, 10)}
                </td>
                <td className="border px-4 py-2">{product.methodology}</td>
                <td className="border px-4 py-2">
                  <a
                    href={product.location}
                    className="text-blue-600 hover:underline"
                  >
                    {product.location}
                  </a>
                </td>

                <td className="border px-4 py-2">
                  <div className="flex">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                      onClick={() => handleEditClick(product)}
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* The Dialog for editing */}
      <Transition appear show={isModalOpen}>
        {editingProduct && (
          <Dialog
            open={true}
            onClose={() => setEditingProduct(null)}
            className="fixed z-10 inset-0 overflow-y-auto"
          >
            <div className="min-h-screen px-4 text-center">
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>

              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Edit Product
                </Dialog.Title>

                {/* Form for editing */}
                <div className="mt-2">
                  {/* Product Name Field */}
                  <div>
                    <label
                      htmlFor="productName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Product Name
                    </label>
                    <input
                      type="text"
                      id="productName"
                      name="productName"
                      value={editingProduct.productName}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          productName: e.target.value,
                        })
                      }
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  {/* Scrum Master Name Field */}
                  <div>
                    <label
                      htmlFor="scrumMasterName"
                      className="block mt-2 text-sm font-medium text-gray-700"
                    >
                      Scrum Master Name
                    </label>
                    <input
                      type="text"
                      id="scrumMasterName"
                      name="scrumMasterName"
                      value={editingProduct.scrumMasterName}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          scrumMasterName: e.target.value,
                        })
                      }
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  {/* Product Owner Name Field */}
                  <div>
                    <label
                      htmlFor="productOwnerName"
                      className="block mt-2 text-sm font-medium text-gray-700"
                    >
                      Product Owner Name
                    </label>
                    <input
                      type="text"
                      id="productOwnerName"
                      name="productOwnerName"
                      value={editingProduct.productOwnerName}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          productOwnerName: e.target.value,
                        })
                      }
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  {/* Developers Field */}
                  <DevelopersInput
                    developers={editingProduct.developers}
                    setDevelopers={(developers) =>
                      setEditingProduct({ ...editingProduct, developers })
                    }
                  />

                  {/* Start Date Field */}
                  <div>
                    <label
                      htmlFor="startDate"
                      className="block mt-2 text-sm font-medium text-gray-700"
                    >
                      Start Date
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={
                        editingProduct.startDate
                          ? new Date(editingProduct.startDate)
                              .toISOString()
                              .split("T")[0]
                          : ""
                      }
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          startDate: e.target.value,
                        })
                      }
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  {/* Methodology Field */}
                  <div>
                    <label
                      htmlFor="methodology"
                      className="block mt-2 text-sm font-medium text-gray-700"
                    >
                      Methodology
                    </label>
                    <input
                      type="text"
                      id="methodology"
                      name="methodology"
                      value={editingProduct.methodology}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          methodology: e.target.value,
                        })
                      }
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  {/* Location Field */}
                  <div>
                    <label
                      htmlFor="location"
                      className="block mt-2 text-sm font-medium text-gray-700"
                    >
                      Location
                    </label>
                    <select
                      id="location"
                      name="location"
                      value={editingProduct.location}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          location: e.target.value,
                        })
                      }
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      {locations.map((location, index) => (
                        <option key={index} value={location}>
                          {location}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Save and Cancel Buttons */}
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={() => updateProduct(editingProduct)}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="ml-4 inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Dialog>
        )}
      </Transition>
    </div>
  );
};
export default ProductList;