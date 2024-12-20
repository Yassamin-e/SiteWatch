import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';
import { IsNumber, IsOptional, IsString, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @ApiProperty({
    required: false,
    description: 'name of project',
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    required: false,
    description: 'BET of project',
  })
  @IsString()
  @IsOptional()
  BET: string;

  @ApiProperty({
    required: false,
    description: 'ETP of project',
  })
  @IsString()
  @IsOptional()
  ETP: string;

  @ApiProperty({
    required: false,
    description: 'cost of project',
  })
  @IsNumber()
  @IsOptional()
  cost: number;

  @ApiProperty({
    required: false,
    description: 'Location of project',
  })
  @IsString()
  @IsOptional()
  Location: string;

  @ApiProperty({
    required: false,
    description: 'Description of project',
  })
  @IsString()
  @IsOptional()
  Description: string;

  @ApiProperty({
    required: false,
    description: 'progress of project',
    minimum: 0,
    maximum: 100,
  })
  @IsNumber()
  @IsOptional()
  progress: number;

  @ApiProperty({ required: false, description: 'start date of project' })
  @Transform(({ value }) => new Date(value))
  @IsDate()
  start: Date;

  @ApiProperty({ required: false, description: 'end date of project' })
  @Transform(({ value }) => new Date(value))
  @IsDate()
  end: Date;

  @ApiProperty({
    description: 'Director id of the manager',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  generalDirectorID: number;

  //   @IsNumber()
  //   userid: number;
}
