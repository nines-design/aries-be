import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getConfig } from './common/utils/index';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { VersioningType, VERSION_NEUTRAL } from '@nestjs/common';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { DefaultExceptionFilter } from './common/exceptions/base.exception.filter';
import { HttpExceptionFilter } from './common/exceptions/http.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  const envConfig = getConfig();
  app.enableVersioning({
    defaultVersion: [VERSION_NEUTRAL, '1', '2'],
    type: VersioningType.URI,
  });
  app.useGlobalFilters(new DefaultExceptionFilter(), new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(envConfig.APP_RUN_PORT);
}
bootstrap();
