import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  schema: "./better-auth-schemas.ts",
  out: "./drizzle",
});
