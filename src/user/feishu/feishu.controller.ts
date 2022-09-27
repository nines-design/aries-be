import {
  Body,
  Controller,
  Post,
  Version,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FeishuMessageDto, GetUserTokenDto } from './feishu.dto';
import { FeishuService } from './feishu.service';

@ApiTags('飞书')
@Controller('/feishu')
export class FeishuController {
  constructor(private readonly feishuService: FeishuService) {}

  @ApiOperation({
    summary: '消息推送',
  })
  @Version(VERSION_NEUTRAL)
  @Post('/sendMessage')
  sendMessage(@Body() params: FeishuMessageDto) {
    const { receive_id_type, ...rest } = params;
    return this.feishuService.sendMessage(receive_id_type, rest);
  }

  @ApiOperation({
    summary: '获取用户凭证',
  })
  @Version(VERSION_NEUTRAL)
  @Post('/getUserToken')
  getUserToken(@Body() params: GetUserTokenDto) {
    const { code } = params;
    return this.feishuService.getUserToken(code);
  }
}

// https://open.feishu.cn/open-apis/authen/v1/index?redirect_uri=http%3A%2F%2F127.0.0.1%3A8080%2Fauth&app_id=cli_a258e6c3aa38d00d&state=auth
