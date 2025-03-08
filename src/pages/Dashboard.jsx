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

const API_BASE_URL =
  import.meta.env.VITE_API_ENDPOINT || "http://localhost:5173/api";

const SALES_API_URL = `${API_BASE_URL}/sales`;
const STOCK_API_URL = `${API_BASE_URL}/inventory`;

const Dashboard = () => {
  const [salesData, setSalesData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(SALES_API_URL).then((response) => response.json()),
      fetch(STOCK_API_URL).then((response) => response.json()),
    ])
      .then(([sales, inventory]) => {
        setSalesData(sales);
        setInventoryData(inventory);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (loading) {
    return <p>Loading Dashboard...</p>;
  }

  const totalStock = inventoryData.reduce((sum, item) => sum + item.stock, 0);
  const lowStockItems = inventoryData.filter((item) => item.stock < 5).length;
  const stockData = inventoryData.map((item) => ({
    name: item.name,
    stock: item.stock,
  }));

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card not-prose outline-base-content/5 bg-primary/5 relative overflow-hidden font-sans shadow-lg outline -outline-offset-1 md:flex-row-reverse">
          <div className="card-body">
            <h2 className="card-title text-lg font-semibold">
              Total Inventory Stock
            </h2>
            <p className="text-2xl font-bold">{totalStock} items</p>
          </div>
        </div>
        <div className="card not-prose outline-base-content/5 bg-primary/5 relative overflow-hidden font-sans shadow-lg outline -outline-offset-1 md:flex-row-reverse">
          <div className="card-body">
            <h2 className="card-title text-lg font-semibold">
              Low Stock Items
            </h2>
            <p className="text-2xl font-bold text-red-500">
              {lowStockItems} items
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="p-4 bg-white shadow-lg  rounded-lg w-full h-[400px]">
          <h3 className="text-lg font-semibold mb-4">Total Sales (Day-wise)</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={salesData}
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <Line
                type="monotone"
                dataKey="totalSales"
                stroke="#8884d8"
                name="Total Sales"
              />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="p-4 bg-white shadow-lg rounded-lg w-full h-[400px]">
          <h3 className="text-lg font-semibold mb-4">
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
              <Bar dataKey="stock" fill="#8884d8" name="Stock" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
