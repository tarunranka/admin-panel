import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../store/productSlice";

const Products = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Product List</h2>

      {status === "loading" && <p>Loading products...</p>}
      {status === "failed" && <p className="text-red-500">Error: {error}</p>}
      {status === "succeeded" && (
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
            {products &&
              products.length &&
              products.map((product) => (
                <tr key={product.sku} className="text-center">
                  <td className="border p-2">{product.name}</td>
                  <td className="border p-2">{product.sku}</td>
                  <td className="border p-2">{product.price}</td>
                  <td className="border p-2">{product.stock}</td>
                  <td className="border p-2">{product.category}</td>
                  <td className="border p-2">{product.status}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Products;
