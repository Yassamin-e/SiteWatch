import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ChangePassDto {
  @ApiProperty({
    description: 'email of the user',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'otp of the user',
    required: true,
    type: 'number',
    minLength: 4,
    maxLength: 4,
  })
  @IsString()
  @MinLength(4)
  @MaxLength(4)
  otp: string;

  @ApiProperty({
    description: 'new password of the user',
    required: true,
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  newPass: string;

  @ApiProperty({
    description: "confirmation of the user's new password ",
    required: true,
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  confirmPass: string;
}
