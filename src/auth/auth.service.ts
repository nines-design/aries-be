import { FeishuService } from '@/user/feishu/feishu.service';
import { UserService } from '@/user/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FeishuUserInfo } from '@/user/feishu/feishu.dto';
import { User } from '@/user/user.mongo.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private feishuService: FeishuService,
  ) {}

  /**
   * 验证飞书用户
   */
  async validateFeishuUser(code: string): Promise<Payload> {
    const feishuInfo: FeishuUserInfo = await this.getFeishuTokenByApplications(
      code,
    );

    // 将飞书的信息同步到数据库
    const user: User = await this.userService.createOrUpdateByFeishu(
      feishuInfo,
    );

    return {
      userId: user.id,
      username: user.username,
      name: user.name,
      email: user.email,
      feishuAccessToken: feishuInfo.accessToken,
      feishuUserId: feishuInfo.feishuUserId,
    };
  }

  async getFeishuTokenByApplications(code: string) {
    const data = await this.feishuService.getUserToken(code);
    const feishuInfo: FeishuUserInfo = {
      accessToken: data.access_token,
      avatarBig: data.avatar_big,
      avatarMiddle: data.avatar_middle,
      avatarThumb: data.avatar_thumb,
      avatarUrl: data.avatar_url,
      email: data.email,
      mobile: data.mobile,
      name: data.namme,
      enName: data.en_name,
      feishuUnionId: data.union_id,
      feishuUserId: data.user_id,
    };
    return feishuInfo;
  }

  async login(user: Payload) {
    return {
      access_token: this.jwtService.sign(user),
    };
  }
}
