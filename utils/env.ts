import { z } from "zod";

export const envVariables = z.object({
  PORT: z.string(),
  DB_URL: z.string(),
  CORS_LIST: z.string(),
});

envVariables.parse(process.env);
