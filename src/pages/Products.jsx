import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../store/productSlice";

const Filter = ({ setCategoryFilter, setStockFilter }) => (
  <div className="mb-4">
    <select
      onChange={(e) => setCategoryFilter(e.target.value)}
      className="mr-2 p-2 border">
      <option value="">All Categories</option>
      <option value="Electronics">Electronics</option>
      <option value="Accessories">Accessories</option>
      <option value="Appliances">Appliances</option>
      <option value="Clothing">Clothing</option>
    </select>
    <select
      onChange={(e) => setStockFilter(e.target.value)}
      className="p-2 border">
      <option value="">All Stock Status</option>
      <option value="In Stock">In Stock</option>
      <option value="Out of Stock">Out of Stock</option>
    </select>
  </div>
);

const ProductTable = ({ products }) => (
  <table className="w-full border-collapse border border-gray-400">
    <thead>
      <tr>
        <th className="border p-2">Product Name</th>
        <th className="border p-2">SKU</th>
        <th className="border p-2">Price ($)</th>
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
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Product List</h2>
      <Filter
        setCategoryFilter={setCategoryFilter}
        setStockFilter={setStockFilter}
      />
      {status === "loading" && <p>Loading products...</p>}
      {status === "failed" && <p className="text-red-500">Error: {error}</p>}
      {status === "succeeded" && <ProductTable products={filteredProducts} />}
    </div>
  );
};

export default Products;
