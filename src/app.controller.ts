import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesValidationPipe } from './pipes/picValidation.pipe';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @UseInterceptors(FileInterceptor('image'))
  @Post('upload-image')
  @UsePipes(ImagesValidationPipe)
  async uploadPicture(
    @UploadedFile()
    file: Express.Multer.File,
  ): Promise<string> {
    return this.appService.uploadPicture(file);
  }
}
