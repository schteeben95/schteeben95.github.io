import { defineConfig } from "vite";

// Static personal site for stevenhan.net (custom domain -> served from root).
export default defineConfig({
  base: "/",
  build: {
    outDir: "dist",
    target: "es2020",
    cssMinify: true,
    sourcemap: false,
  },
});
