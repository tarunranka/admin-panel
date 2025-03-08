import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchSales } from "../store/salesSlice";
import SalesChart from "../components/SalesChart";

const Sales = () => {
  const dispatch = useDispatch();
  const { salesData, loading, error } = useSelector((state) => state.sales);

  useEffect(() => {
    dispatch(fetchSales());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="p-6">
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
    <div className="p-6">
      <div className="grid gap-4 mt-6">
        <SalesChart salesData={salesData} />
      </div>
    </div>
  );
};

export default Sales;
