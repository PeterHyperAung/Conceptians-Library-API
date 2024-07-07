import {
  pgTable,
  serial,
  varchar,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const Book = pgTable("Book", {
  Id: serial("Id").primaryKey().notNull(),
  Title: varchar("Title").notNull(),
  Category: varchar("Category"),
  Subject: varchar("Subject"),
  Image: varchar("Image"),
  Link: varchar("Link").notNull(),
  Filesize: integer("Filesize").notNull(),
});
