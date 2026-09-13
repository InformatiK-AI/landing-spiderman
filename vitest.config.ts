import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Sólo integridad de datos: sin jsdom, así corre en milisegundos.
    environment: "node",
    include: ["content/**/*.test.ts", "lib/**/*.test.ts"],
  },
  resolve: {
    alias: { "@": fileURLToPath(new URL(".", import.meta.url)) },
  },
});
