import { config } from "dotenv";
config();

import { neon } from "@neondatabase/serverless";
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";

const sql = neon(process.env.DB_URL);
export const db: NeonHttpDatabase = drizzle(sql);
