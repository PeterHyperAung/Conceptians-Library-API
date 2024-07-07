import type { Context } from "hono";
import type { BlankEnv, BlankInput } from "hono/types";

import { Book } from "../db/schema";
import { QueryBuilder } from "../utils/QueryBuilder";
import { catchAsync } from "../utils/catchAsync";

export const getBooks = catchAsync(
  async (c: Context<BlankEnv, "/books", BlankInput>) => {
    const { page, category, title } = c.req.query();
    const query = new QueryBuilder(Book);

    const books = await query
      .whereLike(Book.Title, title)
      .whereEq(Book.Category, category)
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
