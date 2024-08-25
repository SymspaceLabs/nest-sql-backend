import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
  Res, UploadedFiles,
} from '@nestjs/common';
import { Response } from 'express';
// import { Express } from 'express';
// import { Multer } from 'multer';
import { File } from 'multer';
// import { multer } from 'multer';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  AnyFilesInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { MinioService } from '../MinioModule/minio.service';

@Controller('products')
export class ProductsController {
  constructor(
    private productsService: ProductsService,
    private minioService: MinioService,
  ) {}

  // @Post()
  @Post('upload-product')
  @UseInterceptors(FilesInterceptor('file'))
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType: 'image/png|image/jpeg|model/gltf-binary',
          }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
        ],
        fileIsRequired: false,
      }),
    )
    // file: Express.Multer.File[],
    file: File,
  ) {
    // console.log('file upload : ', file);
    createProductDto.images = file;

    return await this.productsService.create(createProductDto);
  }

  @Get(':bucket/:filename')
  async getFile(
    @Param('bucket') bucket: string,
    @Param('filename') filename: string,
    @Res() res: Response,
  ) {
    try {
      const file = await this.minioService.getFile(bucket, filename);
      res.setHeader('Content-Type', 'application/octet-stream');
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="${filename}"`,
      );
      res.send(file);
    } catch (err) {
      res.status(500).send('Error retrieving file');
    }
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const productDetail = await this.productsService.findOne(id);
    const productDetailImg = await this.productsService.findOneProdImg(id);
    for (const img of productDetailImg) {
      const newLinkFile = await this.minioService.getFileUrl(
        'ecomm-development',
        img.imageUrl,
      );
      img.imageUrl = newLinkFile;
    }

    return {
      id: productDetail.id,
      name: productDetail.name,
      prodImages: productDetailImg,
      productStatus: productDetail.productStatus,
      threeDModel: productDetail.threeDModel,
      category: productDetail.category,
      modelSize: productDetail.modelSize,
      productFitting: productDetail.productFitting,
      productSizes: productDetail.productSizes,
      productColors: productDetail.productColors,
      productMaterial: productDetail.productMaterial,
      productDimensions: productDetail.productDimensions,
      productSizechart: productDetail.productSizechart,
      productInsurance: productDetail.productInsurance,
      productDescription: productDetail.productDescription,
      price: productDetail.price,
      strikethroughPrice: productDetail.strikethroughPrice,
      chargeTax: productDetail.chargeTax,
      costPerProduct: productDetail.costPerProduct,
      profit: productDetail.profit,
      margin: productDetail.margin,
      createdAt: productDetail.createdAt,
    };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
