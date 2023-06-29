import React from "react";
import { Dialog } from "@headlessui/react";

const Button = ({ children, color, onClick }) => {
  const baseClasses =
    "inline-flex justify-center px-4 py-2 text-sm font-medium border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

  const colorClasses = {
    red: "text-red-900 bg-red-100 hover:bg-red-200 focus-visible:ring-red-500",
    blue: "text-blue-900 bg-blue-100 hover:bg-blue-200 focus-visible:ring-blue-500",
  };

  return (
    <button
      type="button"
      className={`${baseClasses} ${colorClasses[color]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const DeleteProductModal = ({ isModalOpen, product, onConfirm, onCancel }) => {
  if (!isModalOpen || !product) return null;

  return (
    <Dialog
      open={isModalOpen}
      onClose={onCancel}
      className="fixed z-10 inset-0 overflow-y-auto"
    >
      <div className="min-h-screen px-4 text-center">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <span className="inline-block h-screen align-middle" aria-hidden="true">
          &#8203;
        </span>

        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          <Dialog.Title
            as="h3"
            className="text-lg font-medium leading-6 text-gray-900"
          >
            Confirm Delete
          </Dialog.Title>

          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete the product "{product.productName}
              "? This action cannot be undone.
            </p>
          </div>

          <div className="mt-4">
            <Button color="red" onClick={onConfirm}>
              Delete
            </Button>
            <Button color="blue" onClick={onCancel} className="ml-4">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default DeleteProductModal;
