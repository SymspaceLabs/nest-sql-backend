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
  Res,
  ParseIntPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { Multer } from 'multer';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
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
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log(file);
    createProductDto.images = [file];

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
    console.log(productDetail);
    const newLinkFile = await this.minioService.getFileUrl(
      'ecomm-development',
      productDetailImg.imageUrl,
    );
    return {
      id: productDetail.id,
      name: productDetail.name,
      urlFile: newLinkFile,
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
