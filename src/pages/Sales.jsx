import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSales } from "../store/salesSlice";
import SalesChart from "../components/SalesChart";

const Sales = () => {
  const dispatch = useDispatch();
  const { salesData, salesLoading, salesError } = useSelector(
    (state) => state.sales
  );

  const isFetched = useRef(false); // Prevents duplicate fetch in Strict Mode

  useEffect(() => {
    if (!isFetched.current) {
      dispatch(fetchSales());
      isFetched.current = true;
    }
  }, [dispatch]);

  if (salesLoading) {
    return (
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="skeleton h-24 w-full"></div>
          <div className="skeleton h-24 w-full"></div>
        </div>
      </div>
    );
  }

  if (salesError) {
    return (
      <div className="text-red-500 text-center p-4">Error: {salesError}</div>
    );
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
