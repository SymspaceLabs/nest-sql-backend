import { PartialType } from '@nestjs/mapped-types';
import { CreateProduct3dModelDto } from './create-product-3d-model.dto';

export class UpdateProduct3dModelDto extends PartialType(CreateProduct3dModelDto) {}
