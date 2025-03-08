import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import jsonServer from "vite-plugin-simple-json-server";

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5001", // Backend server
        changeOrigin: true, // Ensure the request appears to come from the frontend server
        rewrite: (path) => path.replace(/^\/api/, ""), // Optional: Remove '/api' prefix
      },
    },
  },
  plugins: [tailwindcss(), jsonServer(), react()],
});
