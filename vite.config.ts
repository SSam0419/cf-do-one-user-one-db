import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    react(),
    cloudflare(),
    tailwindcss(),
  ],
  resolve: {
    alias: [
      {
        find: "@/worker",
        replacement: path.resolve(__dirname, "./worker"),
      },
      {
        find: "@/features",
        replacement: path.resolve(__dirname, "./src/features"),
      },
      {
        find: "@",
        replacement: path.resolve(__dirname, "./src"),
      },
    ],
  },
});
