import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { fetchSalesData, fetchInventoryData } from "../api/dashboardApi";
import SalesChart from "../components/SalesChart";

const Dashboard = () => {
  const [salesData, setSalesData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [sales, inventory] = await Promise.all([
          fetchSalesData(),
          fetchInventoryData(),
        ]);

        setSalesData(sales);
        setInventoryData(inventory);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="skeleton h-24 w-full"></div>
          <div className="skeleton h-24 w-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="skeleton h-96 w-full"></div>
          <div className="skeleton h-96 w-full"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">Error: {error}</div>;
  }

  const totalStock = inventoryData.reduce((sum, item) => sum + item.stock, 0);
  const lowStockItems = inventoryData.filter((item) => item.stock < 5).length;
  const stockData = inventoryData.map((item) => ({
    name: item.name,
    stock: item.stock,
  }));

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card bg-primary/5 shadow-lg p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Total Inventory Stock</h2>
          <p className="text-2xl font-bold">{totalStock} items</p>
        </div>
        <div className="card bg-primary/5 shadow-lg p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Low Stock Items</h2>
          <p className="text-2xl font-bold text-red-500">
            {lowStockItems} items
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <SalesChart salesData={salesData} />
        <div className="p-4 bg-white shadow-lg rounded-lg w-full h-[400px]">
          <h3 className="text-lg font-semibold mb-4 text-black">
            Inventory Stock Overview
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={stockData}
              layout="vertical"
              margin={{ top: 5, right: 20, bottom: 5, left: 50 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={150} />
              <Tooltip />
              <Legend />
              <Bar dataKey="stock" fill="#155dfc" name="Stock" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
