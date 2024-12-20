import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDate, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdatePvDto {
  //   @IsDate()
  //   date: Date;

  @ApiProperty({
    required: false,
    description: 'title of rapprot (pv)',
  })
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty({
    required: false,
    description: 'text of rapprot (pv)',
  })
  @IsString()
  @IsOptional()
  text: string;

  @ApiProperty({ required: false, description: 'date of rapport' })
  @Transform(({ value }) => new Date(value))
  @IsDate()
  date: Date;

  @ApiProperty({
    required: false,
    type: 'array of urls',
    description:
      'images of rapprot (pv), if you send empty array i means that the images will be deleted. to preserve the data make sure u always send back the Urls you want to keep',
  })
  @IsArray()
  @IsOptional()
  images: string[];
}
