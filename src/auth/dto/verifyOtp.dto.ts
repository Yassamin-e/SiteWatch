import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
  Matches,
} from 'class-validator';

export class VerifyOtpDto {
  @ApiProperty({
    description: 'Email of the user',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'OTP of the user (4 digits)',
    required: true,
    type: 'string', // Use string since OTPs are better represented as strings
    minLength: 4,
    maxLength: 4,
  })
  @IsString()
  @MinLength(4)
  @MaxLength(4)
  @Matches(/^\d{4}$/, { message: 'OTP must be a 4-digit number' }) // Ensure it's a numeric string
  otp: string; // Change type to string for better handling
}
