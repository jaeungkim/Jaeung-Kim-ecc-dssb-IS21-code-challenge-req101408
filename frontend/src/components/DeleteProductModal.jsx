import React from "react";
import { Dialog, Transition } from "@headlessui/react";

const DeleteProductModal = ({ isModalOpen, product, onConfirm, onCancel }) => {
  return (
    <Transition appear show={isModalOpen}>
      {product && (
        <Dialog
          open={true}
          onClose={onCancel}
          className="fixed z-10 inset-0 overflow-y-auto"
        >
          <div className="min-h-screen px-4 text-center">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

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
                Confirm Delete
              </Dialog.Title>

              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete the product "
                  {product.productName}"? This action cannot be undone.
                </p>
              </div>

              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                  onClick={onConfirm}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="ml-4 inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  onClick={onCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </Dialog>
      )}
    </Transition>
  );
};

export default DeleteProductModal;
