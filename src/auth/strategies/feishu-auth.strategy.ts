import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { FastifyRequest } from 'fastify';
import { AuthService } from '../auth.service';
import { Strategy } from 'passport-custom';

export class FeishuStrategy extends PassportStrategy(Strategy, 'feishu') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(req: FastifyRequest): Promise<Payload> {
    const q: any = req.query;
    const user = await this.authService.validateFeishuUser(q.code as string);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
