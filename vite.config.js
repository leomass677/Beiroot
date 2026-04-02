import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: {
    watch: {
      usePolling: true,
      interval: 100,
    },
    hmr: {
      protocol: "ws",
      host: "localhost",
      port: 5173,
    },
  },

  // Production optimization
  build: {
    // Better chunk splitting strategy for production
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("framer-motion")) return "vendor-animation";
            if (id.includes("react-router-dom")) return "vendor-core";
            if (id.includes("react") || id.includes("react-dom"))
              return "vendor-core";
            if (id.includes("swiper") || id.includes("react-icons"))
              return "vendor-ui";
            if (
              id.includes("axios") ||
              id.includes("clsx") ||
              id.includes("tailwind-merge")
            )
              return "vendor-utils";
            return "vendor";
          }
        },
      },
    },
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Minify JS and CSS (ESBuild default for Vite)
    minify: "esbuild",
    esbuild: {
      drop: ["console"],
    },
    // Target modern browsers for smaller bundles
    target: "esnext",
    // Chunk size warnings
    chunkSizeWarningLimit: 500,
  },

  // Optimize dependencies
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "framer-motion",
      "swiper",
      "clsx",
      "tailwind-merge",
    ],
  },
});
