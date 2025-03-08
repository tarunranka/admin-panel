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
    <div className="fixed inset-0 bg-black opacity-[.90] flex justify-center items-center">
      <div className=" p-6 rounded-lg shadow-lg w-[90%] max-w-2xl">
        <h2 className="text-lg font-semibold mb-4">Product Variants</h2>

        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Color</th>
              <th className="border border-gray-300 p-2">Size</th>
              <th className="border border-gray-300 p-2">Price</th>
              <th className="border border-gray-300 p-2">Stock</th>
            </tr>
          </thead>
          <tbody>
            {product.variants.map((variant, index) => (
              <tr key={index} className="text-center">
                <td className="border border-gray-300 p-2">{variant.color}</td>
                <td className="border border-gray-300 p-2">{variant.size}</td>
                <td className="border border-gray-300 p-2">${variant.price}</td>
                <td className="border border-gray-300 p-2">
                  {variant.stock} units
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 w-full">
          Close
        </button>
      </div>
    </div>
  );
};

export default VariantModal;
