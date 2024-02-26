import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        popup: "src/main.jsx",
        // Add more entry points here if necessary
      },
      output: {
        entryFileNames: "[name].js",
        assetFileNames: "[name].[ext]",
        dir: "extension/dist", // Specify the destination directory
      },
    },
  },
  resolve: {
    alias: {
      // Alias configurations, if needed
    },
  },
});
