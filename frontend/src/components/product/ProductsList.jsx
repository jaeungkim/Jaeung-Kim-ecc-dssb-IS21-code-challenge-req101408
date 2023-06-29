import React, { useState, useEffect } from "react";
import axios from "axios";
import repos from "../../repos.json";
import ProductTable from "./ProductTable";
import DeleteProductModal from "./DeleteProductModal";
import ProductEdit from "./edit-product/ProductEdit";

const ProductList = () => {
  // State management for various properties
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [locations, setLocations] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [error, setError] = useState(false);

  const handleError = (errorState) => {
    setError(errorState);
  };

  const handleDeleteClick = (product) => {
    setDeletingProduct(product);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteProduct = async () => {
    if (deletingProduct) {
      await deleteProduct(deletingProduct.productId);
      setDeletingProduct(null);
      setIsDeleteModalOpen(false);
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const updateProduct = async (updatedProduct) => {
    try {
      await axios.put(
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

  useEffect(() => {
    const htmlUrls = repos.map((item) => item.html_url);
    setLocations(htmlUrls);
  }, []);

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/api/product/${productId}`);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.productId !== productId)
      );
      setApiError(false);
    } catch (error) {
      console.error(error);
      setApiError(true);
    }
  };

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
          Total Number of Products: {products.length}
        </p>
      </div>
      <ProductTable
        products={products}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
      />
      <ProductEdit
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        editingProduct={editingProduct}
        setEditingProduct={setEditingProduct}
        locations={locations}
        updateProduct={updateProduct}
        error={error}
        handleError={handleError}
      />

      <DeleteProductModal
        isModalOpen={isDeleteModalOpen}
        product={deletingProduct}
        onConfirm={confirmDeleteProduct}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
};
export default ProductList;
