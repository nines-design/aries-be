// 环境配置
export interface EnvConfig {
  APP_RUN_PORT: number;
  APP_TOKEN_CACHE_KEY: string;

  FEISHU_CONFIG: {
    FEISHU_URL: string;
    FEISHU_API_HOST: string;
    FEISHU_APP_ID: string;
    FEISHU_APP_SECRET: string;
  };

  MONGODB_CONFIG: {
    name: string; // 自定义次数据库链接名称
    type: 'mongodb'; // 数据库链接类型
    url: string; // 数据库链接地址
    username: string; // 数据库链接用户名
    password: string; // 数据库链接密码
    database: string; // 数据库名
    entities: string; // 自定义加载类型
    logging: boolean; // 数据库打印日志
    synchronize: boolean; // 是否开启同步数据表功能
  };

  MYSQL_CONFIG: {
    name: string;
    type: 'mysql' | 'mariadb';
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    entities: string;
    synchronize: boolean;
  };
}
