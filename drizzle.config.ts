import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  dialect: "postgresql",
  schema: "./db/schema.ts",
  out: "./drizzle",
  strict: true,
  verbose: true,
  dbCredentials: {
    url: process.env.DB_URL,
  },
});
