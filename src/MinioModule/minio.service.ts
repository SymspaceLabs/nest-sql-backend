import { Injectable } from '@nestjs/common';
import * as Minio from 'minio';
import * as process from 'process';
import { Readable } from 'stream';

@Injectable()
export class MinioService {
  private minioClient: Minio.Client;
  constructor() {
    this.minioClient = new Minio.Client({
      endPoint: '154.53.63.170', //'media.symspacelabs.com',
      port: 9000, // Or the appropriate port
      useSSL: false, // Adjust based on your setup
      accessKey: process.env.SPACES_KEY,
      secretKey: process.env.SPACES_SECRET,
    });
  }
  async uploadFile(file: Buffer, filename: string): Promise<string> {
    const bucketName = 'ecomm-development'; // Replace with your bucket
    const objectName = filename; // Or generate a unique name

    try {
      // await this.minioClient.putObject(bucketName, objectName, file);
      // return { message: 'File uploaded successfully' };

      const Location = await this.minioClient.putObject(
        bucketName,
        objectName,
        file,
      );
      console.log(Location);
      return Location.versionId;
    } catch (err) {
      console.error('Error uploading file:', err);
      throw err; // Or handle the error gracefully
    }
  }

  async getFile(bucketName: string, objectName: string): Promise<Buffer> {
    try {
      const dataStream: Readable = await this.minioClient.getObject(
        bucketName,
        objectName,
      );

      const chunks: Buffer[] = [];

      for await (const chunk of dataStream) {
        chunks.push(chunk);
      }

      return Buffer.concat(chunks);
    } catch (err) {
      throw new Error(`Error retrieving file from MinIO: ${err.message}`);
    }
  }

  async getFileUrl(
    bucketName: string,
    objectName: string,
    expiresIn: number = 24 * 60 * 60,
  ): Promise<string> {
    try {
      const url = await this.minioClient.presignedGetObject(
        bucketName,
        objectName,
        expiresIn,
      );
      return url;
    } catch (err) {
      throw new Error(`Error generating URL from MinIO: ${err.message}`);
    }
  }

  // async uploadFileWa(buffer: Buffer, filename: string): Promise<string> {
  //   const params = {
  //     Bucket: `${process.env.DO_S3_BUCKET}`,
  //     Key: filename,
  //     Body: buffer,
  //     ContentType: 'application/octet-stream',
  //   };
  //   // console.log('param bucket: ', params);
  //   const { Location } = await this.s3.upload(params).promise();
  //   return Location;
  // }

  // async generateS3ObjectLinks(objectPath: string): Promise<string> {
  //   const bucketName = process.env.DO_S3_BUCKET;
  //   // const objectLinks: string;
  //
  //   // for (const path of objectPaths) {
  //   const params = {
  //     Bucket: bucketName,
  //     Key: objectPath,
  //     Expires: 3600, // Link expiration time in seconds (adjust as needed)
  //   };
  //   // objectLinks.push(url);
  //   // }
  //
  //   return await this.s3.getSignedUrlPromise('getObject', params);
  // }
}
