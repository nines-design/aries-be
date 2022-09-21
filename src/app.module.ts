import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getConfig } from './common/utils';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [getConfig],
    }),
    UserModule,
  ],
})
export class AppModule {}
