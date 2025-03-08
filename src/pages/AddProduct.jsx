import React, { useState } from "react";
import { useDispatch } from "react-redux";
import FormInputField from "../components/FormInputField";
import FileUploadParser from "../components/FileUploadParser";
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
  const [feedback, setFeedback] = useState(null);

  const handleChange = (e) => {
    setNewProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileParse = (parsedData) => {
    setVariants(parsedData);
    setFeedback({ type: "success", message: "CSV parsed successfully!" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addProduct({ ...newProduct, variants })).unwrap();
      setFeedback({ type: "success", message: "Product added successfully!" });
      setNewProduct({
        name: "",
        sku: "",
        price: "",
        stock: "",
        category: "",
        status: "In Stock",
      });
      setVariants([]);
    } catch {
      setFeedback({
        type: "error",
        message: "Failed to add product. Please try again.",
      });
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Add Product</h2>
      {feedback && (
        <div
          role="alert"
          className={`p-4 mb-4 rounded-md text-white text-center ${
            feedback.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}>
          {feedback.message}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 place-items-center">
        <form onSubmit={handleSubmit} className="p-4">
          <FormInputField
            label="Name"
            name="name"
            type="text"
            value={newProduct.name}
            handleChange={handleChange}
          />
          <FormInputField
            label="SKU"
            name="sku"
            type="text"
            value={newProduct.sku}
            handleChange={handleChange}
          />
          <FormInputField
            label="Price"
            name="price"
            type="number"
            value={newProduct.price}
            handleChange={handleChange}
          />
          <FormInputField
            label="Stock"
            name="stock"
            type="number"
            value={newProduct.stock}
            handleChange={handleChange}
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

          <FileUploadParser onFileParse={handleFileParse} />
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
            className="col-span-2 mt-4 p-2 bg-blue-500 text-white w-full rounded-md shadow-md hover:bg-blue-600">
            Add Product
          </button>
        </form>
      </div>
      {variants.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Parsed Variants</h3>
          <ul className="list-disc pl-5">
            {variants.map((variant, index) => (
              <li key={index} className="mt-2">
                {Object.values(variant).join(" - ")}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
