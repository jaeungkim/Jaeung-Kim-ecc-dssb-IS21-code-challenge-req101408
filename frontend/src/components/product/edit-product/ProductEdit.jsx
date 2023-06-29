import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import DevelopersInput from "../DevelopersInput";

const ProductEdit = ({
  isModalOpen,
  setIsModalOpen,
  editingProduct,
  setEditingProduct,
  locations,
  updateProduct,
  error,
  handleError,
}) => {
  if (!editingProduct) return null;

  const handleChildError = (error) => {
    handleError(error);
  };

  return (
    <Transition appear show={isModalOpen}>
      {editingProduct && (
        <Dialog
          open={true}
          onClose={() => setEditingProduct(null)}
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
                Edit Product
              </Dialog.Title>

              <div className="mt-2">
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>

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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>

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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>

                <DevelopersInput
                  developers={editingProduct.developers}
                  setDevelopers={(developers) =>
                    setEditingProduct({ ...editingProduct, developers })
                  }
                  handleError={handleChildError}
                />

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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="methodology"
                    className="block mt-2 text-sm font-medium text-gray-700"
                  >
                    Methodology
                  </label>
                  <select
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="Agile">Agile</option>
                    <option value="Waterfall">Waterfall</option>
                  </select>
                </div>

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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    {locations.map((location, index) => (
                      <option key={index} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className={`inline-flex justify-center px-4 py-2 text-sm font-medium border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                      error
                        ? "text-gray-500 bg-gray-200"
                        : "text-blue-900 bg-blue-100 hover:bg-blue-200 focus-visible:ring-blue-500"
                    }`}
                    onClick={() => updateProduct(editingProduct)}
                    disabled={error}
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
  );
};
export default ProductEdit;
