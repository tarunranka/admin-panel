import React from "react";

const VariantModal = ({ product, onClose }) => {
  if (
    !product ||
    !Array.isArray(product.variants) ||
    product.variants.length === 0
  ) {
    return null; // Don't render if no variants exist
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-[90%] max-w-2xl z-10">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Product Variants
        </h2>

        <div className="max-h-[60vh] overflow-y-auto">
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
            <thead className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white sticky top-0">
              <tr>
                <th className="border border-gray-300 dark:border-gray-600 p-2">
                  Color
                </th>
                <th className="border border-gray-300 dark:border-gray-600 p-2">
                  Size
                </th>
                <th className="border border-gray-300 dark:border-gray-600 p-2">
                  Price
                </th>
                <th className="border border-gray-300 dark:border-gray-600 p-2">
                  Stock
                </th>
              </tr>
            </thead>
            <tbody>
              {product.variants.map((variant, index) => (
                <tr
                  key={index}
                  className="text-center bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                  <td className="border border-gray-300 dark:border-gray-600 p-2">
                    {variant.color}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 p-2">
                    {variant.size}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 p-2">
                    ${variant.price}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 p-2">
                    {variant.stock} units
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 w-full transition">
          Close
        </button>
      </div>
    </div>
  );
};

export default VariantModal;
