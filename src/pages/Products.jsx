import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../store/productSlice";
import { Link } from "react-router-dom";

const Filter = ({ setCategoryFilter, setStockFilter }) => (
  <div className="flex flex-wrap gap-2">
    <select
      onChange={(e) => setCategoryFilter(e.target.value)}
      className="p-2 border rounded-md">
      <option value="">All Categories</option>
      <option value="Electronics">Electronics</option>
      <option value="Accessories">Accessories</option>
      <option value="Appliances">Appliances</option>
      <option value="Clothing">Clothing</option>
    </select>
    <select
      onChange={(e) => setStockFilter(e.target.value)}
      className="p-2 border rounded-md">
      <option value="">All Stock Status</option>
      <option value="In Stock">In Stock</option>
      <option value="Out of Stock">Out of Stock</option>
    </select>
  </div>
);

const ProductTable = ({ products }) => (
  <div className="overflow-x-auto  shadow-md rounded-md p-4">
    <table className="w-full border-collapse border border-gray-300 text-sm md:text-base">
      <thead>
        <tr>
          <th className="border p-2">Product Name</th>
          <th className="border p-2">SKU</th>
          <th className="border p-2">Price (AED)</th>
          <th className="border p-2">Stock</th>
          <th className="border p-2">Category</th>
          <th className="border p-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {products.length > 0 ? (
          products.map((product) => (
            <tr key={product.sku} className="text-center">
              <td className="border p-2">{product.name}</td>
              <td className="border p-2">{product.sku}</td>
              <td className="border p-2">{product.price}</td>
              <td className="border p-2">{product.stock}</td>
              <td className="border p-2">{product.category}</td>
              <td className="border p-2">{product.status}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" className="border p-2 text-center text-gray-500">
              No products found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

const Products = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [stockFilter, setStockFilter] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const filteredProducts = Array.isArray(products)
    ? products.filter(
        (product) =>
          (categoryFilter === "" || product.category === categoryFilter) &&
          (stockFilter === "" || product.status === stockFilter)
      )
    : [];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Product List</h2>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 p-4 shadow-md rounded-md">
        <Filter
          setCategoryFilter={setCategoryFilter}
          setStockFilter={setStockFilter}
        />
        <div className="flex gap-2">
          <Link
            to="/add-product"
            className="p-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600">
            Add Product
          </Link>
          <Link
            to="/add-variants"
            className="p-2 bg-yellow-500 text-white rounded-md shadow-md hover:bg-yellow-600">
            Upload Variants
          </Link>
        </div>
      </div>
      {status === "loading" && (
        <p className="text-center text-gray-700">Loading products...</p>
      )}
      {status === "failed" && (
        <p className="text-red-500 text-center">Error: {error}</p>
      )}
      {status === "succeeded" && <ProductTable products={filteredProducts} />}
    </div>
  );
};

export default Products;
