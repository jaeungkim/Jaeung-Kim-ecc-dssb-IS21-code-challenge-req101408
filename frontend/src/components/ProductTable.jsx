import React from "react";
import ProductItem from "./ProductItem";

const ProductTable = ({ products, onEditClick, onDeleteClick }) => {
  return (
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
          {products.map((product) => (
            <ProductItem
              key={product.productId}
              product={product}
              onEditClick={onEditClick}
              onDeleteClick={onDeleteClick}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
