export interface EnvConfig {
  APP_RUN_PORT: number;

  FEISHU_CONFIG: {
    FEISHU_URL: string;
    FEISHU_API_HOST: string;
    FEISHU_APP_ID: string;
    FEISHU_APP_SECRET: string;
  };

  APP_TOKEN_CACHE_KEY: string;
}
