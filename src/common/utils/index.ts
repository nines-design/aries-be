import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { join } from 'path';
import { EnvConfig } from 'src/type';

export function getEnvConfig() {
  const runtime = process.env.NODE_ENV ?? 'dev';
  const filePath = join(__dirname, '../../../config', `${runtime}.env`);
  console.log(filePath);
  const content = fs.readFileSync(filePath, 'utf-8');
  const envConfig = dotenv.parse(content);
  return envConfig as unknown as EnvConfig;
}
