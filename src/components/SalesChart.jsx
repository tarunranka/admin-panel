import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const SalesChart = ({ salesData }) => {
  return (
    <div className="p-4 bg-white shadow-lg rounded-lg w-full h-[400px]">
      <h3 className="text-lg text-black font-semibold mb-4">
        Total Sales (Day-wise)
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={salesData}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Line
            type="monotone"
            dataKey="totalSales"
            stroke="#155dfc"
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
  );
};

export default SalesChart;
