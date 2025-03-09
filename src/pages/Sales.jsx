import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSales, fetchSalesOrders } from "../store/salesSlice";
import SalesChart from "../components/SalesChart";
import SalesOrdersTable from "../components/SalesOrdersTable";

const Sales = () => {
  const dispatch = useDispatch();
  const {
    salesData,
    salesOrdersData,
    salesLoading,
    ordersLoading,
    salesError,
    ordersError,
  } = useSelector((state) => state.sales);

  const isFetched = useRef(false); // Prevents duplicate fetch in Strict Mode

  useEffect(() => {
    if (!isFetched.current) {
      dispatch(fetchSales());
      dispatch(fetchSalesOrders());
      isFetched.current = true;
    }
  }, [dispatch]);

  if (salesLoading || ordersLoading) {
    return (
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="skeleton h-24 w-full"></div>
          <div className="skeleton h-24 w-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Sales Chart Section */}
      <div className="ounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Sales Overview
        </h2>
        {salesError && (
          <p className="text-red-500 text-center">Error: {salesError}</p>
        )}
        <SalesChart salesData={salesData} />
      </div>

      {/* Sales Orders Table Section */}
      <div className="rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Recent Sales Orders
        </h2>
        {ordersError && (
          <p className="text-red-500 text-center">Error: {ordersError}</p>
        )}
        <SalesOrdersTable orders={salesOrdersData} />
      </div>
    </div>
  );
};

export default Sales;
