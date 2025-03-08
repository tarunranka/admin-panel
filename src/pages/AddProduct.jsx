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

  const [variants, setVariants] = useState([]);
  const [file, setFile] = useState(null);
  const [feedback, setFeedback] = useState(null);

  // Handle input change for product details
  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Manually parse CSV file
  const handleParseCSV = () => {
    if (!file) {
      setFeedback({ type: "error", message: "Please upload a CSV file." });
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const text = event.target.result;
      console.log(text);
      const rows = text
        .split("\n")
        .map((row) => row.trim())
        .filter((row) => row !== ""); // Trim and filter empty lines
      if (rows.length < 2) {
        setFeedback({
          type: "error",
          message: "CSV file is empty or invalid.",
        });
        return;
      }

      const headers = rows[0].split(",").map((header) => header.trim());
      const data = rows.slice(1).map((row) => {
        const values = row.split(",").map((value) => value.trim());
        return headers.reduce((acc, header, index) => {
          acc[header] = values[index] || "";
          return acc;
        }, {});
      });

      setVariants(data);
      setFeedback({ type: "success", message: "CSV parsed successfully!" });
    };

    reader.readAsText(file);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addProduct({ ...newProduct, variants })).unwrap();
      setFeedback({ type: "success", message: "Product added successfully!" });

      // Reset form after submission
      setNewProduct({
        name: "",
        sku: "",
        price: "",
        stock: "",
        category: "",
        status: "In Stock",
      });
      setVariants([]);
      setFile(null);
    } catch (error) {
      setFeedback({
        type: "error",
        message: "Failed to add product. Please try again.",
      });
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Add Product</h2>
      {/* Feedback Message */}
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
        {/* Product Form */}

        <form onSubmit={handleSubmit} className="p-4">
          <fieldset className="border p-4 rounded-lg shadow-md">
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

            {/* File Upload Section */}
            <label className="block mb-1 mt-3 font-medium">
              Upload Variants
            </label>
            <div className="flex m-2">
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="w-full file-input file-input-primary"
              />
              <button
                type="button"
                onClick={handleParseCSV}
                className="w-full p-2 bg-yellow-500 text-white rounded-md shadow-md hover:bg-yellow-600 ml-2">
                Parse CSV
              </button>
            </div>
            <p className="text-red-500 text-sm text-center mt-2">
              * Parse the file before adding the product; otherwise, it will not
              be considered.
              <a
                href="/public/products.csv"
                download="products.csv"
                className="ml-1 text-blue-300">
                Download Sample CSV
              </a>
            </p>
            <button
              type="submit"
              className="mt-4 p-2 bg-blue-500 text-white w-full rounded-md shadow-md hover:bg-blue-600">
              Add Product
            </button>
          </fieldset>
        </form>

        {/* Parsed Variants Preview */}
        {variants.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Parsed Variants</h3>
            <ul className="list-disc pl-5">
              {variants.map((variant, index) => (
                <li key={index} className="mt-2">
                  {variant.name} - {variant.sku} - {variant.color} -{" "}
                  {variant.size} - AED {variant.price} - {variant.stock} units
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddProduct;
