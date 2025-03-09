const API_BASE_URL =
  import.meta.env.VITE_API_ENDPOINT || "http://localhost:5173/api";

export const fetchSalesData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/sales`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || "Failed to fetch sales data");
  }
};

export const fetchInventoryData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/inventory`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message || "Failed to fetch inventory data");
  }
};
