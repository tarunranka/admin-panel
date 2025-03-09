import React, { useState, useEffect, useRef, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../store/productSlice";
import VariantModal from "../components/VariantModal";
import LoadingTable from "../components/LoadingTable";
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

const ProductTable = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="overflow-x-auto p-4">
      <table className="w-full border-collapse border-gray-300 text-sm md:text-base">
        <thead>
          <tr>
            <th className="border p-2">Product Name</th>
            <th className="border p-2">SKU</th>
            <th className="border p-2">Price (AED)</th>
            <th className="border p-2">Stock</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Variants</th>
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
                <td className="border p-2">
                  {Array.isArray(product.variants) &&
                  product.variants.length > 0 ? (
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
                      View Variants
                    </button>
                  ) : (
                    <span className="text-gray-400">No Variants</span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="border p-2 text-center text-gray-500">
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {selectedProduct && (
        <VariantModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

const Products = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [stockFilter, setStockFilter] = useState("");

  const isFetched = useRef(false); // Prevent duplicate fetch calls

  useEffect(() => {
    if (!isFetched.current && status === "idle") {
      dispatch(fetchProducts());
      isFetched.current = true;
    }
  }, [dispatch, status]);

  const filteredProducts = useMemo(() => {
    return Array.isArray(products)
      ? products.filter(
          (product) =>
            (categoryFilter === "" || product.category === categoryFilter) &&
            (stockFilter === "" || product.status === stockFilter)
        )
      : [];
  }, [products, categoryFilter, stockFilter]);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Product List</h2>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 p-4 shadow-lg rounded-md">
        <Filter
          setCategoryFilter={setCategoryFilter}
          setStockFilter={setStockFilter}
        />
        <div className="flex gap-2">
          <Link
            to="/add-product"
            className="p-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600">
            Add Product
          </Link>
        </div>
      </div>
      {status === "loading" && <LoadingTable />}

      {status === "failed" && (
        <p className="text-red-500 text-center">Error: {error}</p>
      )}
      {status === "succeeded" && <ProductTable products={filteredProducts} />}
    </div>
  );
};

export default Products;
