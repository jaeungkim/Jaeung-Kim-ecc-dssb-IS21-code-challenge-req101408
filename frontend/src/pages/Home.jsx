import React, { useState } from "react";
import Layout from "../components/Layout";
import ProductList from "../components/ProductsList";
import ProductForm from "../components/ProductForm";

const Home = () => {
  const [activeTab, setActiveTab] = useState("productList");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <Layout>
      <div className="container mx-auto mt-4">
        <h1 className="text-3xl font-bold mb-4">Product Management</h1>
        <div className="flex mb-4">
          <button
            className={`mr-2 py-2 px-4 ${
              activeTab === "productList"
                ? "bg-gray-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handleTabClick("productList")}
          >
            Product List
          </button>
          <button
            className={`py-2 px-4 ${
              activeTab === "productForm"
                ? "bg-gray-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handleTabClick("productForm")}
          >
            Add New Product
          </button>
        </div>
        {activeTab === "productList" ? <ProductList /> : <ProductForm />}
      </div>
    </Layout>
  );
};

export default Home;
