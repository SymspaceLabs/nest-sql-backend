import {
  IsString,
  IsNumber,
  IsOptional,
  IsNotEmpty,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
// import { File } from 'multer';
// import { Request } from 'express';

class CreateProductVariantPropertyDto {
  @IsString()
  key: string;

  @IsString()
  value: string;
}

class CreatePriceDto {
  @IsNumber()
  amount: number;
}

class CreateProductVariantDto {
  @ValidateNested({ each: true })
  @Type(() => CreateProductVariantPropertyDto)
  properties: CreateProductVariantPropertyDto[];

  @ValidateNested({ each: true })
  @Type(() => CreatePriceDto)
  prices: CreatePriceDto[];
}

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;


  @IsString()
  @IsNotEmpty()
  variantsJson: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  company?: string;
  //
  // @IsArray()
  // @IsOptional()
  // images?: Express.Multer.File[];

  @IsArray()
  @IsOptional()
  @Type(() => Object)
  images?: Express.Multer.File[];
  // images?: File[];

  @IsOptional()
  @Type(() => Object)
  threedmodel?: Express.Multer.File;
  // threedmodel?: File;

  @IsString()
  @IsOptional()
  model3D?: string;

  @IsArray()
  @IsOptional()
  size?: string[];

  @IsString()
  @IsOptional()
  sizeFit?: 'Runs small' | 'True to size' | 'Runs big';

  @IsArray()
  @IsOptional()
  color?: string[];

  @IsNumber()
  @IsOptional()
  quantity?: number;

  @IsString()
  @IsOptional()
  type?: 'dynamic' | 'static';

  @IsString()
  @IsOptional()
  material?: string;

  @IsString()
  @IsOptional()
  productFitting?: 'True to Size' | 'Runs Small' | 'Runs Big';

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductVariantDto)
  variants: CreateProductVariantDto[];
}
