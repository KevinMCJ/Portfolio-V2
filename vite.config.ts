import { defineConfig, AliasOptions } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import path from "path";
import svgr from "vite-plugin-svgr";
import netlifyPlugin from "@netlify/vite-plugin-react-router";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@components": path.resolve(__dirname, "./src/components"),
    } as AliasOptions,
  },
  plugins: [react(), tailwindcss(), tsConfigPaths(), svgr(), netlifyPlugin()],
});
