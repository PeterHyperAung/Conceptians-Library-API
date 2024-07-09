import type { Context } from "hono";
import type { BlankEnv, BlankInput } from "hono/types";

import { Book } from "../db/schema";
import { QueryBuilder } from "../utils/QueryBuilder";
import { catchAsync } from "../utils/catchAsync";
import { and, ilike } from "drizzle-orm";

export const getBooks = catchAsync(
  async (c: Context<BlankEnv, "/books", BlankInput>) => {
    let { page, category = "", title = "" } = c.req.query();

    if (category.toLowerCase() === "all") {
      category = "";
    }

    const query = new QueryBuilder(Book);

    const books = await query
      .where(
        and(
          ilike(Book.Title, `%${title}%`),
          ilike(Book.Category, `%${category}`)
        )
      )
      .page(page)
      .build();

    return c.json({
      status: 200,
      data: { books },
      message: "success",
      count: books.length,
    });
  }
);
