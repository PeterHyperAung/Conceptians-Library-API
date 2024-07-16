import { config } from "dotenv";
config();

import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { envVariables } from "./utils/env";
import { z } from "zod";
import { getBooks } from "./controllers/book.controller";
import { cors } from "hono/cors";

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}

const app = new Hono();

app.use(
  "/*",
  cors({
    origin: process.env.CORS_LIST.split(",") || "*",
    allowHeaders: ["X-Custom-Header", "Upgrade-Insecure-Requests"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    maxAge: 600,
    credentials: true,
  })
);

app.get("/books", getBooks);

const port = parseInt(process.env.PORT) || 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
