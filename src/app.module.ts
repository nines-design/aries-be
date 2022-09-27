import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getConfig, getPartOfConfig } from './common/utils';
import { UserModule } from './user/user.module';
import * as redisStore from 'cache-manager-redis-store';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

const redisConfig = getPartOfConfig('REDIS_CONFIG');

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: redisConfig.host,
      port: redisConfig.port,
      auth_pass: redisConfig.auth,
      db: redisConfig.db,
    }),
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [getConfig],
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
