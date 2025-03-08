const API_BASE_URL =
  import.meta.env.VITE_API_ENDPOINT || "http://localhost:5173/api";

const SALES_API_URL = `${API_BASE_URL}/sales`;
const STOCK_API_URL = `${API_BASE_URL}/inventory`;

console.log("Sales API:", SALES_API_URL);
console.log("Stock API:", STOCK_API_URL);

export default function Dashboard() {
  return <h2 className="text-xl font-semibold mb-4">Dashboard</h2>;
}
