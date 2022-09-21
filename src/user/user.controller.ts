import { Controller, Get, Version, VERSION_NEUTRAL } from '@nestjs/common';
import { UserService } from './user.service';
import { BusinessException } from '../common/exceptions/business.exception';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('hello')
  @Version([VERSION_NEUTRAL, '2'])
  getHello(): string {
    return this.userService.getHello();
  }

  @Get('testError')
  testError() {
    const a: any = {};
    console.log(a.b.c);
  }

  @Get('findBusinessError')
  @Version([VERSION_NEUTRAL, '1'])
  findBusinessError() {
    const a: any = {};
    try {
      console.log(a.b.c);
    } catch (error) {
      throw new BusinessException('你这个参数错了啊');
    }
    return 'hahahai';
  }
}
