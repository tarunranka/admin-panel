// 📂 src/components/SalesOrdersTable.jsx
import React from "react";

const SalesOrdersTable = ({ orders }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-max border-collapse border border-gray-300 text-sm md:text-base">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-3 text-left md:text-center">Order ID</th>
            <th className="border p-3 text-left md:text-center">Date</th>
            <th className="border p-3 text-left md:text-center">
              Amount (AED)
            </th>
            <th className="border p-3 text-left md:text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr
                key={order.id}
                className="text-left md:text-center border-b hover:bg-gray-50 transition">
                <td className="border p-3">{order.id}</td>
                <td className="border p-3 whitespace-nowrap">{order.date}</td>
                <td className="border p-3">${order.amount.toFixed(2)}</td>
                <td
                  className={`border p-3 font-semibold ${
                    order.status === "Paid"
                      ? "text-green-500"
                      : order.status === "Pending"
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}>
                  {order.status}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="border p-4 text-center text-gray-500">
                No orders found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SalesOrdersTable;
