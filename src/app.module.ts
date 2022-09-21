import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getConfig } from './common/utils';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
    }),
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [getConfig],
    }),
    UserModule,
  ],
})
export class AppModule {}
