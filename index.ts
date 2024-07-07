import dotenv from "dotenv";
dotenv.config();

import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { envVariables } from "./utils/env";
import { z } from "zod";
import { Book } from "./db/schema";
import { QueryBuilder } from "./utils/QueryBuilder";
import { getBooks } from "./controllers/book.controller";

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}

const app = new Hono();

app.get("/books", getBooks);

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
