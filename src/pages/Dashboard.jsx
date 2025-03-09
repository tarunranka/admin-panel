import React, { useState, useEffect, useRef } from "react";
import { fetchSalesData, fetchInventoryData } from "../api/dashboardApi";
import InventoryChart from "../components/InventoryChart";
import SalesChart from "../components/SalesChart";
import CardCount from "../components/CardCount";

const Dashboard = () => {
  const [salesData, setSalesData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isFetched = useRef(false); // Prevent duplicate API calls

  useEffect(() => {
    if (isFetched.current) return; // Ensure API calls run only once
    isFetched.current = true;

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
        <CardCount title="Total Inventory Stock" count={totalStock} />
        <CardCount
          title="Low Stock Items"
          count={lowStockItems}
          textColor="text-red-500"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <SalesChart salesData={salesData} />
        <InventoryChart inventoryData={stockData} />
      </div>
    </div>
  );
};

export default Dashboard;
