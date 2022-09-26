import * as fs from 'fs';
import { join } from 'path';
import { EnvConfig } from 'src/type';
import { parse } from 'yaml';

// 获取项目运行环境
export const getEnv = () => {
  return process.env.RUNNING_ENV;
};

/**
 * 获取所有项目配置
 */
export const getConfig = () => {
  const environment = getEnv();
  const yamlPath = join(process.cwd(), `./.config/.${environment}.yaml`);
  const file = fs.readFileSync(yamlPath, 'utf8');
  const config: EnvConfig = parse(file);
  return config;
};

/**
 * 获取一部分项目配置
 * @param type 配置类名
 */
export const getPartOfConfig = <T extends keyof EnvConfig>(type: T) => {
  return getConfig()[type];
};
