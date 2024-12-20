import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDate, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreatePvDto {
  //   @IsDate()
  //   date: Date;
  @ApiProperty({
    required: true,
    description: 'title of rapprot (pv)',
  })
  @IsString()
  title: string;
 
  @ApiProperty({ required: true, description: 'date of rapport' })
  @Transform(({ value }) => new Date(value))
  @IsDate()
  date: Date;

  @ApiProperty({
    required: true,
    description: 'text of rapprot (pv)',
  })
  @IsString()
  text: string;

  @ApiProperty({
    required: true,
    type: 'array of urls',
    description: 'images of rapprot (pv)',
  })
  @IsArray()
  images: string[];
}
