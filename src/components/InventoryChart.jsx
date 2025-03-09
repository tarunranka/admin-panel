import React from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const InventoryChart = ({ inventoryData }) => {
  const stockData = inventoryData.map((item) => ({
    name: item.name,
    stock: item.stock,
  }));

  return (
    <div className="border p-4 bg-white shadow-lg rounded-lg w-full h-[400px]">
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
  );
};

export default InventoryChart;
