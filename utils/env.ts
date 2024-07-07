import { z } from "zod";

export const envVariables = z.object({
  PORT: z.string(),
  DB_URL: z.string(),
});

envVariables.parse(process.env);
