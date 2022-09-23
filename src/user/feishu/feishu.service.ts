import { BusinessException } from '@/common/exceptions/business.exception';
import { getAppToken } from '@/helper/feishu/auth';
import { message } from '@/helper/feishu/message';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';

@Injectable()
export class FeishuService {
  private APP_TOKEN_CACHE_KEY;

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private configServie: ConfigService,
  ) {
    this.APP_TOKEN_CACHE_KEY = this.configServie.get('APP_TOKEN_CACHE_KEY');
  }

  async getAppToken() {
    let appToken: string | undefined;
    // eslint-disable-next-line prefer-const
    appToken = await this.cacheManager.get(this.APP_TOKEN_CACHE_KEY);

    if (!appToken) {
      const response = await getAppToken();

      if (response.code === 0) {
        appToken = response.app_access_token;
        this.cacheManager.set(this.APP_TOKEN_CACHE_KEY, appToken, {
          ttl: response.expire - 60,
        });
      } else {
        throw new BusinessException('飞书调用异常');
      }
    }
    return appToken as string;
  }

  async sendMessage(receive_id_type, params) {
    const app_token = await this.getAppToken();
    return message(receive_id_type, params, app_token as string);
  }
}
