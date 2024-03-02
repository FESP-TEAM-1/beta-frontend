import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import svgr from "vite-plugin-svgr";
import ckeditor5 from "@ckeditor/vite-plugin-ckeditor5";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    ckeditor5({ theme: require.resolve("@ckeditor/ckeditor5-theme-lark") }),
    visualizer({
      filename: "./dist/report.html",
      open: true,
      gzipSize: true,
    }),
  ],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          const module = id.split("node_modules/").pop().split("/")[0];
          if (["@ckeditor", "react-datepicker"].includes(module)) {
            return `${module}`;
          }
        },
      },
    },
  },
});
