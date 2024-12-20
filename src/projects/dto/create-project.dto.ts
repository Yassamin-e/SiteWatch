import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProjectDto {
  @ApiProperty({ required: true, description: 'name of project' })
  @IsString()
  name: string;

  @ApiProperty({ required: true, description: 'BET of project' })
  @IsString()
  BET: string;

  @ApiProperty({ required: true, description: 'ETP of project' })
  @IsString()
  ETP: string;

  @ApiProperty({ required: true, description: 'cost of project' })
  @IsNumber()
  cost: number;

  @ApiProperty({ required: true, description: 'Location of project' })
  @IsString()
  Location: string;

  @ApiProperty({ required: true, description: 'Description of project' })
  @IsString()
  Description: string;

  @ApiProperty({
    required: true,
    description: 'progress of project',
    minimum: 0,
    maximum: 100,
  })
  @IsNumber()
  progress: number;

  @ApiProperty({ required: true, description: 'start date of project' })
  @Transform(({ value }) => new Date(value))
  @IsDate()
  start: Date;

  @ApiProperty({ required: true, description: 'end date of project' })
  @Transform(({ value }) => new Date(value))
  @IsDate()
  end: Date;

  @ApiProperty({
    description: 'Director id of the manager',
    required: false,
  })
  @IsNumber()
  generalDirectorID: number;

  //   @IsNumber()
  //   userid: number;
}
