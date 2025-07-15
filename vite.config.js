import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "https://journal-hub-server.onrender.com", // Proxy all /api requests to the backend
    },
  },
  plugins: [react()],
});
