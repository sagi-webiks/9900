import { defineConfig } from "vitest/config";

import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";

import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  optimizeDeps: {
    include: ["@emotion/react", "@emotion/styled", "@mui/material", "@mui/icons-material"],
  },
  server: {
    host: '0.0.0.0',  
    port: 5173
  }
});
