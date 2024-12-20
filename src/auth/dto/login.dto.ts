import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'email of the user',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'password of the user',
    minLength: 6,
    required: true,
  })
  @IsString()
  @MinLength(6)
  password: string;
}
