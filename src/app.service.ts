import { BadRequestException, Injectable } from '@nestjs/common';
import * as path from 'path';
import { promises as fs } from 'fs';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async uploadPicture(file: Express.Multer.File): Promise<string> {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const uploadDir = path.join(__dirname, '../uploads/images');
    const filePath = path.join(uploadDir, file.originalname);

    // Ensure the directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    // Write the file to the disk
    await fs.writeFile(filePath, file.buffer);

    // Return the relative path
    return `/images/${file.originalname}`;
    // return `/uploads/profile-pics/${file.originalname}.${file.mimetype.replace('image/', '')}`;
  }
}
