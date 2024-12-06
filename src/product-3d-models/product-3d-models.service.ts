import { Injectable } from '@nestjs/common';
import { CreateProduct3dModelDto } from './dto/create-product-3d-model.dto';
import { UpdateProduct3dModelDto } from './dto/update-product-3d-model.dto';

@Injectable()
export class Product3dModelsService {
  create(createProduct3dModelDto: CreateProduct3dModelDto) {
    return 'This action adds a new product3dModel';
  }

  findAll() {
    return `This action returns all product3dModels`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product3dModel`;
  }

  update(id: number, updateProduct3dModelDto: UpdateProduct3dModelDto) {
    return `This action updates a #${id} product3dModel`;
  }

  remove(id: number) {
    return `This action removes a #${id} product3dModel`;
  }
}
