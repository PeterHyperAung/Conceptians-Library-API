import { config } from "dotenv";
import { cors } from "hono/cors";

config();

import { Hono } from "hono";
import { handle } from "hono/aws-lambda";
import { getBooks } from "../controllers/book.controller";

const app = new Hono();

app.use(
  "/*",
  cors({
    origin: process.env.CORS_LIST.split(","),
    allowHeaders: ["X-Custom-Header", "Upgrade-Insecure-Requests"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    maxAge: 600,
    credentials: true,
  })
);
app.get("/books", getBooks);

export const handler = handle(app);
