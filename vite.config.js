import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Tailwind v4: configured through this plugin and src/index.css (@theme).
// There is no tailwind.config.js and no postcss.config.js.
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
