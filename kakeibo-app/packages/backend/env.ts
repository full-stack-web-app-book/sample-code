import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

export const env = createEnv({
  server: {
    DATABASE_HOST: z.string(),
    DATABASE_PORT: z.string().transform((val) => parseInt(val)),
    DATABASE_NAME: z.string(),
    DATABASE_USER: z.string(),
    DATABASE_PASSWORD: z.string(),
    FRONTEND_URL: z.string().url(),
  },
  runtimeEnv: process.env,
});
