import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'minio';
import { Readable } from 'stream';

@Injectable()
export class MinioService {
  private readonly minioClient: Client;
  private readonly bucketName = 'images'; // Specify the bucket name

  constructor(private readonly configService: ConfigService) {
    this.minioClient = new Client({
      endPoint: this.configService.get<string>('MINIO_ENDPOINT'),
      port: +this.configService.get<number>('MINIO_PORT'),
      useSSL: false,
      accessKey: this.configService.get<string>('MINIO_ACCESS_KEY'),
      secretKey: this.configService.get<string>('MINIO_SECRET_KEY'),
    });
  }

  async uploadFile(filename: string, file: Express.Multer.File): Promise<string> {
    const fileStream = Readable.from(file.buffer);

    // Ensure the bucket exists
    const bucketExists = await this.minioClient.bucketExists(this.bucketName);
    if (!bucketExists) {
      await this.minioClient.makeBucket(this.bucketName, 'us-east-1');
    }

    // Upload the file
    await this.minioClient.putObject(this.bucketName, filename, fileStream, file.size);

    // Construct the URL (assuming bucket is public)
    const fileUrl = `${this.configService.get<string>('MINIO_ENDPOINT')}:${this.configService.get<number>('MINIO_PORT')}/${this.bucketName}/${filename}`;
    
    return fileUrl;
  }
}
