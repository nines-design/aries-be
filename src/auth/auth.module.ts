import { UserModule } from '@/user/user.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthControllser } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constant';
import { FeishuStrategy } from './strategies/feishu-auth.strategy';
import { JwtStrategy } from './strategies/jwt-auth.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
  controllers: [AuthControllser],
  providers: [AuthService, JwtStrategy, FeishuStrategy],
  exports: [AuthService],
})
export class AuthModule {}
