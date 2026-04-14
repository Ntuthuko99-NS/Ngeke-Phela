import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Vite configuration for a React app
export default defineConfig({
  logLevel: "error", // only show errors in terminal

  plugins: [
    react(),
  ],
});
