import {
  IsString,
  IsNumber,
  IsOptional,
  IsNotEmpty,
  IsArray,
} from 'class-validator';
import {Type} from "class-transformer";

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

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
}
