import { Injectable } from '@nestjs/common';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import { UpdateProductImageDto } from './dto/update-product-image.dto';
import process from "process";

@Injectable()
export class ProductImagesService {
  create(createProductImageDto: CreateProductImageDto) {
    return 'This action adds a new productImage';
  }

  findAll() {
    return `This action returns all productImages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productImage`;
  }

  update(id: number, updateProductImageDto: UpdateProductImageDto) {
    return `This action updates a #${id} productImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} productImage`;
  }

  // async uploadFile(buffer: Buffer, filename: string): Promise<string> {
  //   const params = {
  //     Bucket: process.env.DO_S3_BUCKET,
  //     Key: filename,
  //     Body: buffer,
  //   };
  //   const { Location } = await this.s3.upload(params).promise();
  //   return Location;
  // }
}
