const API_BASE_URL =
  import.meta.env.VITE_API_ENDPOINT || "http://localhost:5173/api";

export const fetchProductsApi = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    throw new Error(error.message || "An unexpected error occurred");
  }
};

export const addProductApi = async (product) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message || "An unexpected error occurred");
  }
};
