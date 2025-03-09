import React, { useState, useEffect, useRef } from "react";
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

  // Filters State
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [OrderAmount, setOrderAmount] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

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
        <div className="skeleton h-24 w-full"></div>
        <div className="skeleton h-24 w-full"></div>
      </div>
    );
  }

  // Filtering Logic
  const { start: startDateStr, end: endDateStr } = dateRange; // Destructure dateRange
  const startDate = startDateStr ? new Date(startDateStr) : null;
  const endDate = endDateStr ? new Date(endDateStr) : null;
  const minOrderAmount = OrderAmount ? parseFloat(OrderAmount) : null;

  const filteredOrders = salesOrdersData.filter((order) => {
    const orderDate = new Date(order.date);
    const isWithinDateRange =
      (!startDate || orderDate >= startDate) &&
      (!endDate || orderDate <= endDate);

    const meetsOrderAmount = !minOrderAmount || order.amount >= minOrderAmount;

    const matchesStatus = !statusFilter || order.status === statusFilter;

    return isWithinDateRange && meetsOrderAmount && matchesStatus;
  });

  return (
    <div className="p-6">
      {/* Sales Chart Section */}
      <div className="pb-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Sales Overview
        </h2>
        {salesError && (
          <p className="text-red-500 text-center">Error: {salesError}</p>
        )}
        <SalesChart salesData={salesData} />
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Recent Sales Orders
        </h2>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-4 bg-white p-4 shadow-md rounded-lg">
          {/* Date Range Filter */}
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) =>
              setDateRange({ ...dateRange, start: e.target.value })
            }
            className="border p-2 rounded-md"
          />
          <input
            type="date"
            value={dateRange.end}
            onChange={(e) =>
              setDateRange({ ...dateRange, end: e.target.value })
            }
            className="border p-2 rounded-md"
          />

          {/* Minimum Order Amount Filter */}
          <input
            type="number"
            placeholder="Order Amount"
            value={OrderAmount}
            onChange={(e) => setOrderAmount(e.target.value)}
            className="border p-2 rounded-md"
          />

          {/* Payment Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border p-2 rounded-md">
            <option value="">All Statuses</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>
        </div>

        {/* Sales Orders Table */}
        {ordersLoading ? (
          <p className="text-center">Loading orders...</p>
        ) : ordersError ? (
          <p className="text-red-500 text-center">Error: {ordersError}</p>
        ) : (
          <SalesOrdersTable orders={filteredOrders} />
        )}
      </div>
    </div>
  );
};

export default Sales;
