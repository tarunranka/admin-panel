const API_BASE_URL =
  import.meta.env.VITE_API_ENDPOINT || "http://localhost:5173/api";

export const fetchSalesData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/sales`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    throw new Error(error.message || "An unexpected error occurred");
  }
};

export const fetchSalesOrdersData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/sales-orders`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    throw new Error(error.message || "An unexpected error occurred");
  }
};
