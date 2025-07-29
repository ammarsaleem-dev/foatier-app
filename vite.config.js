import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from 'node:path';


export default defineConfig({
  resolve: {
    alias: {
      "ziggy-js": path.resolve("vendor/tightenco/ziggy"),
    },
  },
  plugins: [
    laravel({
      input: ["resources/css/app.css", "resources/js/app.jsx"],
      refresh: true,
    }),
    tailwindcss(),
    react(),
  ],
});
