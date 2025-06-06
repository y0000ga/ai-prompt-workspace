import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@component": resolve(__dirname, "src/sidepanel/components"),
      "@utils": resolve(__dirname, "src/sidepanel/utils"),
      "@styles": resolve(__dirname, "src/sidepanel/styles"),
      "@hooks": resolve(__dirname, "src/sidepanel/hooks"),
      "@types": resolve(__dirname, "src/sidepanel/types"),
    },
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        sidepanel: resolve(__dirname, "index.html"),
        background: resolve(__dirname, "src/background/index.ts"),
      },
      output: {
        entryFileNames: "assets/[name].js",
        chunkFileNames: "assets/[name].js",
        assetFileNames: "assets/[name][extname]",
      },
    },
  },
});
