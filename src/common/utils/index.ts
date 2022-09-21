import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { join } from 'path';
import { EnvConfig } from 'src/type';
import { parse } from 'yaml';

export function getEnvConfig() {
  const runtime = process.env.NODE_ENV ?? 'dev';
  const filePath = join(__dirname, '../../../config', `${runtime}.env`);
  console.log(filePath);
  const content = fs.readFileSync(filePath, 'utf-8');
  const envConfig = dotenv.parse(content);
  return envConfig as unknown as EnvConfig;
}

// 获取项目运行环境
export const getEnv = () => {
  return process.env.RUNNING_ENV;
};

// 读取项目配置
export const getConfig = () => {
  const environment = getEnv();
  const yamlPath = join(process.cwd(), `./.config/.${environment}.yaml`);
  const file = fs.readFileSync(yamlPath, 'utf8');
  const config = parse(file);
  return config as EnvConfig;
};
