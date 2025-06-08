import path from "path"
import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react-swc"

export default defineConfig({
  base: "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["__tests__/setup.ts"],
    globals: true,
  },
})
