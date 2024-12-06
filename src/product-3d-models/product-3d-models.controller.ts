import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Product3dModelsService } from './product-3d-models.service';
import { CreateProduct3dModelDto } from './dto/create-product-3d-model.dto';
import { UpdateProduct3dModelDto } from './dto/update-product-3d-model.dto';

@Controller('product-3d-models')
export class Product3dModelsController {
  constructor(private readonly product3dModelsService: Product3dModelsService) {}

  @Post()
  create(@Body() createProduct3dModelDto: CreateProduct3dModelDto) {
    return this.product3dModelsService.create(createProduct3dModelDto);
  }

  @Get()
  findAll() {
    return this.product3dModelsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.product3dModelsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProduct3dModelDto: UpdateProduct3dModelDto) {
    return this.product3dModelsService.update(+id, updateProduct3dModelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.product3dModelsService.remove(+id);
  }
}
