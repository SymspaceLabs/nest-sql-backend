import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MinioService } from '../minio/minio.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly minioService: MinioService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    try {
      const filename = `${Date.now()}-${file.originalname}`;
      const fileUrl = await this.minioService.uploadFile(filename, file);

      return { message: 'File uploaded successfully', url: fileUrl };
    } catch (error) {
      return { message: 'File upload failed', error };
    }
  }
}
