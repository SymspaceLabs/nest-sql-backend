import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { MinioService } from '../MinioModule/minio.service';
import {ProductImage} from "../product-images/entities/product-image.entity";

@Injectable()
export class ProductsService {
  private products = [];
  private productImages = [];

  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(ProductImage) private productImageRepository: Repository<ProductImage>,
    private readonly minioService: MinioService,
  ) {}
  async create(createProductDto: CreateProductDto) {
    let buffer: any;
    console.log('img', createProductDto.images);
    // let i = 0;
    // for (buffer in createProductDto.images) {
    // i = i + 1;
    // console.log(i);
    // const filename = file.originalname;
    const timestamp = Date.now(); // Get current timestamp
    const randomString = uuidv4(); // Generate a random string
    const filename = `${timestamp}-${randomString}-${createProductDto.images[0].originalname}`;
    const resultUpload = await this.minioService.uploadFile(
      createProductDto.images[0].buffer,
      filename,
    );
    const prodImageNew = {
      imageUrl: filename,
    };
    this.productImages.push(prodImageNew);
    // break;
    // }

    const newProductInsert = this.productRepository.create({
      name: createProductDto.name,
      images: this.productImages,
      createdAt: new Date(),
      category: 'Fashion',
      productFitting: createProductDto.productFitting,
    });
    // return this.quickCountEntityRepository.save(newQuickCount);
    this.productRepository.save(newProductInsert);
    return newProductInsert;
  }

  async findAll() {
    const queryBuilder =
      this.productRepository.createQueryBuilder('product');
    return queryBuilder.getMany();
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOneById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async findOneProdImg(id: string) {
    const queryBuilder =
      this.productImageRepository.createQueryBuilder('productImage');
    return queryBuilder
      .where('productId= :productId', {
        productId: id,
      })
      .getOne();
    // const product = await this.productImageRepository.findOneBy({productId
    // if (!product) {
    //   throw new NotFoundException(`Product with ID ${id} not found`);
    // }
    // return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const productIndex = this.products.findIndex((prod) => prod.id === id);
    if (productIndex === -1) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    const updatedProduct = {
      ...this.products[productIndex],
      ...updateProductDto,
    };
    this.products[productIndex] = updatedProduct;
    return updatedProduct;
  }

  remove(id: number) {
    const productIndex = this.products.findIndex((prod) => prod.id === id);
    if (productIndex === -1) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    const removedProduct = this.products.splice(productIndex, 1);
    return removedProduct[0];
  }
}
