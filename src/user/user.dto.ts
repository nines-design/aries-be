import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class AddUserDto {
  @ApiProperty({ example: 123 })
  id?: string;

  @ApiProperty({ example: 'San Zhang' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'zhangsan@qq.com' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'zhangsan' })
  @IsNotEmpty()
  username: string;
}
