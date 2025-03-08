import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { fetchSales } from "../store/salesSlice";

const Sales = () => {
  const dispatch = useDispatch();
  const { salesData, loading, error } = useSelector((state) => state.sales);

  useEffect(() => {
    dispatch(fetchSales());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="skeleton h-24 w-full"></div>
          <div className="skeleton h-24 w-full"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <div className="grid gap-4 mt-6">
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
      </div>
    </div>
  );
};

export default Sales;
