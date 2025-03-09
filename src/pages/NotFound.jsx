import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-6">
      <h1 className="text-7xl font-bold text-blue-600">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mt-4">
        Oops! Page Not Found
      </h2>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
