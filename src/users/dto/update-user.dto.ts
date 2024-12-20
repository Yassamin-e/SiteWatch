// import { PartialType } from '@nestjs/mapped-types';
// import { CreateUserDto } from './create-user.dto';

// export class UpdateUserDto extends PartialType(CreateUserDto) {}

import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Usertype } from 'src/constants';

export class UpdateUserDto {
  @ApiProperty({
    minLength: 3,
    description: 'first name of the user',
    required: true,
  })
  @IsString()
  @MinLength(3)
  @IsOptional()
  firstname: string;

  @ApiProperty({
    minLength: 3,
    description: 'last name of the user',
    required: true,
  })
  @IsString()
  @MinLength(3)
  @IsOptional()
  lastname: string;

  @ApiProperty({
    description: 'email of the user',
    required: true,
  })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({
    minLength: 6,
    description: 'password of the user',
    required: true,
  })
  @IsString()
  @MinLength(6)
  @IsOptional()
  password: string;

  @ApiProperty({
    description: 'type of the user',
    required: true,
    enum: Usertype,
  })
  @IsEnum(Usertype)
  @IsOptional()
  userType: Usertype;

  //   @ApiProperty({
  //     minLength: 3,
  //     description: 'type of the user',
  //     required: false,
  //     nullable:true,
  //   })
  @ApiProperty({
    description: 'picture of the user (url)',
    required: true,
  })
  @IsString()
  @IsOptional()
  picture: string;
}
