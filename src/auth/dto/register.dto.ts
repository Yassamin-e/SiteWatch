import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Usertype } from 'src/constants';

export class RegisterDto {
  @ApiProperty({
    minLength: 3,
    description: 'first name of the user',
    required: true,
  })
  @IsString()
  @MinLength(3)
  firstname: string;

  @ApiProperty({
    minLength: 3,
    description: 'last name of the user',
    required: true,
  })
  @IsString()
  @MinLength(3)
  lastname: string;

  @ApiProperty({
    description: 'email of the user',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    minLength: 6,
    description: 'password of the user',
    required: true,
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'type of the user',
    required: true,
    enum: Usertype,
  })
  @IsEnum(Usertype)
  userType: Usertype;

  @ApiProperty({
    description: 'Director id of the manager',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  generalDirectorID: number;

  //   @ApiProperty({
  //     minLength: 3,
  //     description: 'type of the user',
  //     required: false,
  //     nullable:true,
  //   })
  @IsString()
  @IsOptional()
  picture: string;
}
