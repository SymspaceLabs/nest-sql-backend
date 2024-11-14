import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'minio';
import { Readable } from 'stream';

@Injectable()
export class MinioService {
  private readonly minioClient: Client;
  private readonly bucketName = 'images';

  constructor(private readonly configService: ConfigService) {
    this.minioClient = new Client({
      endPoint: this.configService.get<string>('MINIO_ENDPOINT'),
      port: +this.configService.get<number>('MINIO_PORT'),
      useSSL: false,
      accessKey: this.configService.get<string>('MINIO_ACCESS_KEY'),
      secretKey: this.configService.get<string>('MINIO_SECRET_KEY'),
    });
  }

  async setBucketPolicy() {
    const policy = {
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Allow',
          Principal: '*',
          Action: ['s3:GetObject'],
          Resource: [`arn:aws:s3:::${this.bucketName}/*`],
        },
      ],
    };

    await this.minioClient.setBucketPolicy(this.bucketName, JSON.stringify(policy));
  }

  async uploadFile(filename: string, file: Express.Multer.File): Promise<string> {
    const fileStream = Readable.from(file.buffer);
    
    // Ensure the bucket exists
    const bucketExists = await this.minioClient.bucketExists(this.bucketName);
    if (!bucketExists) {
      await this.minioClient.makeBucket(this.bucketName, 'us-east-1');
      await this.setBucketPolicy();
    }
  
    // Define metadata with Content-Type
    const metaData = {
      'Content-Type': file.mimetype, // This will use the MIME type from the uploaded file
    };
  
    // Upload the file with metadata
    await this.minioClient.putObject(this.bucketName, filename, fileStream, file.size, metaData);
  
    // Construct the URL (assuming bucket is public)
    const protocol = this.configService.get<boolean>('MINIO_USE_SSL') ? 'https' : 'http';
    const fileUrl = `${protocol}://${this.configService.get<string>('MINIO_ENDPOINT')}:${this.configService.get<number>('MINIO_PORT')}/${this.bucketName}/${filename}`;
  
    return fileUrl;
  }
  
  
}
