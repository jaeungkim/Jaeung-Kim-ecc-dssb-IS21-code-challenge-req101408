import React from "react";

const ProductItem = ({ product, onEditClick, onDeleteClick }) => {
  return (
    <tr key={product.productId} className="hover:bg-gray-100">
      <td className="border px-4 py-2">{product.productId}</td>
      <td className="border px-4 py-2">{product.productName}</td>
      <td className="border px-4 py-2">{product.scrumMasterName}</td>
      <td className="border px-4 py-2">{product.productOwnerName}</td>
      <td className="border px-4 py-2">{product.developers.join(", ")}</td>
      <td className="border px-4 py-2">
        {product.startDate && product.startDate.slice(0, 10)}
      </td>
      <td className="border px-4 py-2">{product.methodology}</td>
      <td className="border px-4 py-2">
        <a href={product.location} className="text-blue-600 hover:underline">
          {product.location}
        </a>
      </td>
      <td className="border px-4 py-2">
        <div className="flex">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
            onClick={() => onEditClick(product)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2"
            onClick={() => onDeleteClick(product)}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ProductItem;
