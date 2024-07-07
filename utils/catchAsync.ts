import type { Context } from "hono";
import type { BlankEnv, BlankInput } from "hono/types";

export const catchAsync =
  (fn: Function) => (c: Context<BlankEnv, "/books", BlankInput>) =>
    fn(c).catch((e: any) => {
      console.log(e);
      c.json({ status: 500, error: "Something went wrong!" });
    });
