import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  // HashRouter means no base path needed for GitHub Pages
  server: { port: 5173, host: true },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react":   ["react", "react-dom", "react-router-dom"],
          "vendor-motion":  ["framer-motion"],
          "vendor-charts":  ["recharts"],
          "vendor-gsap":    ["gsap"],
        },
      },
    },
  },
});
