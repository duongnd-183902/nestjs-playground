/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv").config();
import z from "zod";
import { parseEnv } from "znv";

const createConfigFromEnvironment = (environment: NodeJS.ProcessEnv) => {
  const config = parseEnv(environment, {
    ENV_PROJECT: z.enum(["LOCAL", "STG", "PRODUCTION"]),
    LOG_LEVEL: z
      .enum(["TRACE", "DEBUG", "INFO", "WARN", "ERROR", "FATAL", "SILENT"])
      .default("INFO"),
    PORT: z.number(),
    SWAGGER: z.enum(["yes", "no"]),
    API_PREFIX: z.string().nullable(),
    AUTHORIZATION: z.array(z.string()).default([]),
    CHATGPT_BASE_URL: z.string().default("https://chatgpt.com"),
    AUTH_KEY: z.string().nullable(),
    X_SIGN: z.string().nullable(),

    ARK0SE_TOKEN_URL: z.string().default(""),
    PROXY_URL: z.string().default(""),
    EXPORT_PROXY_URL: z.string().nullable(),
    IMPERSONATE: z.string().default("[]"),
    USER_AGENTS: z.string().default("[]"),

    CF_FILE_URL: z.string().nullable(),
    TURNSTILE_SOLVER_URL: z.string().nullable(),

    HISTORY_DISABLED: z.boolean().default(true),
    POW_DIFFICULTY: z.string().default("000032"),
    RETRY_TIMES: z.number().default(3),
    CONVERSATION_ONLY: z.boolean().default(false),
    ENABLE_LIMIT: z.boolean().default(true),
    UPLOAD_BY_URL: z.boolean().default(false),
    CHECK_MODEL: z.boolean().default(false),
    SCHEDULED_REFRESH: z.boolean().default(false),
    RANDOM_TOKEN: z.boolean().default(true),
    OAI_LANGUAGE: z.string().default("zh-CN"),

    ENABLE_GATEWAY: z.boolean().default(false),
    AUTO_SEED: z.boolean().default(true),
    NO_SENTINEL: z.boolean().default(false),
    ACCESS_TOKEN: z.string().default(""),
  });

  return {
    ...config,
    chatgpt_base_url_list: config.CHATGPT_BASE_URL.split(",")
      .map((item) => item.trim())
      .filter(Boolean),
    ark0se_token_url_list: config.ARK0SE_TOKEN_URL.split(",")
      .map((item) => item.trim())
      .filter(Boolean),
    proxy_url_list: config.PROXY_URL.split(",")
      .map((item) => item.trim())
      .filter(Boolean),
    impersonate_list: JSON.parse(config.IMPERSONATE),
    user_agents_list: JSON.parse(config.USER_AGENTS),
  };
};

export type Config = ReturnType<typeof createConfigFromEnvironment>;

const config = createConfigFromEnvironment(process.env);

export default config;
