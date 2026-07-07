import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
import dotenv from "dotenv";

dotenv.config(); // 環境変数を読み込む

export const env = createEnv({
  server: {
    FRONTEND_URL: z.string().url(),
  },
  runtimeEnv: process.env,
});
