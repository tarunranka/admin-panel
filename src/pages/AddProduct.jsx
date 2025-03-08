import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../store/productSlice";

const AddProduct = () => {
  const dispatch = useDispatch();
  const [newProduct, setNewProduct] = useState({
    name: "",
    sku: "",
    price: "",
    stock: "",
    category: "",
    status: "In Stock",
  });

  const [feedback, setFeedback] = useState(null);

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addProduct(newProduct)).unwrap();
      setFeedback({ type: "success", message: "Product added successfully!" });
      setNewProduct({
        name: "",
        sku: "",
        price: "",
        stock: "",
        category: "",
        status: "In Stock",
      });
    } catch (error) {
      setFeedback({
        type: "error",
        message: "Failed to add product. Please try again.",
      });
    }
  };

  return (
    <div className="p-6">
      {feedback && (
        <div
          role="alert"
          className={`p-4 mb-4 rounded-md text-white text-center ${
            feedback.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}>
          {feedback.message}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <form onSubmit={handleSubmit} className="p-4">
          <fieldset className="border p-4 rounded-lg shadow-md">
            <legend className="text-lg font-semibold">Add Product</legend>

            <label className="block mb-1 mt-3 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Product Name"
              required
            />

            <label className="block mb-1 mt-3 font-medium">SKU</label>
            <input
              type="text"
              name="sku"
              value={newProduct.sku}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Product SKU"
              required
            />

            <label className="block mb-1 mt-3 font-medium">Price</label>
            <input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Product Price"
              required
            />

            <label className="block mb-1 mt-3 font-medium">Stock</label>
            <input
              type="number"
              name="stock"
              value={newProduct.stock}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Stock Quantity"
              required
            />

            <label className="block mb-1 mt-3 font-medium">Category</label>
            <select
              name="category"
              value={newProduct.category}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required>
              <option value="">Select a Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Accessories">Accessories</option>
              <option value="Appliances">Appliances</option>
              <option value="Clothing">Clothing</option>
            </select>

            <label className="block mb-1 mt-3 font-medium">Stock Status</label>
            <select
              name="status"
              value={newProduct.status}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required>
              <option value="In Stock">In Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>

            <button
              type="submit"
              className="mt-4 p-2 bg-blue-500 text-white w-full rounded-md shadow-md hover:bg-blue-600">
              Add Product
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
