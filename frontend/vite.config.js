import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/translate": {
        target: "https://xx-six-sepia.vercel.app", // 🔥 정확한 translate.js API 주소!
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // /api → /
      },
    },
  },
});
