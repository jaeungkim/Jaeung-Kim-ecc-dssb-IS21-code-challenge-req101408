import React, { useState, useEffect } from "react";
import axios from "axios";

// The ProductList component displays a list of products with their details
const ProductList = () => {
  // State management for various properties
  const [products, setProducts] = useState([]); // List of products
  const [editingProduct, setEditingProduct] = useState(null); // Product being edited
  const [scrumMasterSearchText, setScrumMasterSearchText] = useState(""); // Scrum master search text
  const [developerSearchText, setDeveloperSearchText] = useState(""); // Developer search text
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered list of products
  const [apiError, setApiError] = useState(false); // API error flag

  // Handles clicking the edit button for a product
  const handleEditClick = (product) => {
    setEditingProduct(product);
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
        <div className="flex justify-between items-center mb-4">
          <div className="flex">
            <input
              type="text"
              placeholder="Search by Scrum Master"
              value={scrumMasterSearchText}
              onChange={(e) => setScrumMasterSearchText(e.target.value)}
              className="border px-2 py-1 rounded-lg mr-2 w-48 sm:w-auto"
            />
            <input
              type="text"
              placeholder="Search by Developer"
              value={developerSearchText}
              onChange={(e) => setDeveloperSearchText(e.target.value)}
              className="border px-2 py-1 rounded-lg w-48 sm:w-auto"
            />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto w-full">
        <table className="table-responsive table-auto border-collapse border border-gray-500">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Product Number</th>
              <th className="px-4 py-2">Product Name</th>
              <th className="px-4 py-2">Scrum Master</th>
              <th className="px-4 py-2">Product Owner</th>
              <th className="px-4 py-2">Developer Names</th>
              <th className="px-4 py-2">Start Date</th>
              <th className="px-4 py-2">Methodology</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.productId} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{product.productId}</td>
                <td className="border px-4 py-2">
                  {editingProduct &&
                  editingProduct.productId === product.productId ? (
                    <input
                      type="text"
                      value={editingProduct.productName}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          productName: e.target.value,
                        })
                      }
                      className="border px-2 py-1 rounded-lg w-full max-w-xs"
                    />
                  ) : (
                    product.productName
                  )}
                </td>
                <td className="border px-4 py-2">
                  {editingProduct &&
                  editingProduct.productId === product.productId ? (
                    <input
                      type="text"
                      value={editingProduct.scrumMasterName}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          scrumMasterName: e.target.value,
                        })
                      }
                      className="border px-2 py-1 rounded-lg w-full max-w-xs"
                    />
                  ) : (
                    product.scrumMasterName
                  )}
                </td>
                <td className="border px-4 py-2">
                  {editingProduct &&
                  editingProduct.productId === product.productId ? (
                    <input
                      type="text"
                      value={editingProduct.productOwnerName}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          productOwnerName: e.target.value,
                        })
                      }
                      className="border px-2 py-1 rounded-lg w-full max-w-xs"
                    />
                  ) : (
                    product.productOwnerName
                  )}
                </td>
                <td className="border px-4 py-2">
                  {editingProduct &&
                  editingProduct.productId === product.productId ? (
                    <input
                      type="text"
                      value={editingProduct.developers.join(", ")}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          developers: e.target.value.split(", "),
                        })
                      }
                      className="border px-2 py-1 rounded-lg w-full max-w-xs"
                    />
                  ) : (
                    product.developers.join(", ")
                  )}
                </td>
                <td className="border px-4 py-2">
                  {editingProduct &&
                  editingProduct.productId === product.productId ? (
                    <input
                      type="date"
                      value={editingProduct.startDate.slice(0, 10)}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          startDate: e.target.value,
                        })
                      }
                      className="border px-2 py-1 rounded-lg w-full max-w-xs"
                    />
                  ) : (
                    product.startDate && product.startDate.slice(0, 10)
                  )}
                </td>
                <td className="border px-4 py-2">
                  {editingProduct &&
                  editingProduct.productId === product.productId ? (
                    <select
                      value={editingProduct.methodology}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          methodology: e.target.value,
                        })
                      }
                      className="border px-2 py-1 rounded-lg w-full max-w-xs"
                    >
                      <option value={product.methodology}>
                        {product.methodology}
                      </option>
                      <option
                        value={
                          product.methodology === "Agile"
                            ? "Waterfall"
                            : "Agile"
                        }
                      >
                        {product.methodology === "Agile"
                          ? "Waterfall"
                          : "Agile"}
                      </option>
                    </select>
                  ) : (
                    product.methodology
                  )}
                </td>
                <td className="border px-4 py-2">
                  <div className="flex">
                    {editingProduct &&
                    editingProduct.productId === product.productId ? (
                      <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2"
                        onClick={() => updateProduct(editingProduct)}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                        onClick={() => handleEditClick(product)}
                      >
                        Edit
                      </button>
                    )}
                    {editingProduct &&
                      editingProduct.productId === product.productId && (
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                          onClick={() => setEditingProduct(null)}
                        >
                          Cancel
                        </button>
                      )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ProductList;
