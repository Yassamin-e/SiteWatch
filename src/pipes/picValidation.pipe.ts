import { Request } from 'express';
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

// @Injectable()
// export class FileSizeValidationPipe implements PipeTransform {
//   transform(value: any, metadata: ArgumentMetadata) {
//     // "value" is an object containing the file's attributes and metadata
//     // const oneKb = 1000;
//     const tenmb = 10000000;

//     return value.size < tenmb;
//   }
// }
// import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ImagesValidationPipe implements PipeTransform {
  readonly maxSize = 15 * 1024 * 1024; // 10 MB in bytes
  readonly allowedMimeTypes = /^(image\/jpg|image\/jpeg|image\/png)$/;

  transform(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    // Check file size
    if (file.size > this.maxSize) {
      throw new BadRequestException('File size exceeds 15 MB');
    }

    // Check MIME type
    if (!this.allowedMimeTypes.test(file.mimetype)) {
      throw new BadRequestException('Only jpeg, jpg and png are allowed');
    }

    file.originalname =
      Date.now().toString() + '.' + file.mimetype.split('/')[1];
    console.log(file);

    return file;
  }
}
