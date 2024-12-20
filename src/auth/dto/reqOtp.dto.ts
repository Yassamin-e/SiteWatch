import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ReqOtpDto {
  @ApiProperty({
    description: 'email of the user',
    required: true,
  })
  @IsEmail()
  email: string;
}
