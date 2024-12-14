import {
  IsString,
  IsNumber,
  IsOptional,
  IsNotEmpty,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateProductColorDto } from 'src/product-colors/dto/create-product-color.dto';

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

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  images?: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductColorDto)
  @IsOptional()
  colors?: CreateProductColorDto[];

  @IsOptional()
  model?: { name: string; filePath: string; format?: string };

  @IsString()
  @IsOptional()
  composition?: string;

  @IsString()
  @IsOptional()
  sizeFit?: string;

  @IsArray()
  @IsOptional()
  sizes?: string[];


  // @IsString()
  // @IsNotEmpty()
  // variantsJson: string;

  // @IsOptional()
  // @Type(() => Object)
  // threedmodel?: Express.Multer.File;

  // @IsString()
  // @IsOptional()
  // model3D?: string;

  // @IsString()
  // @IsOptional()
  // sizeFit?: 'Runs small' | 'True to size' | 'Runs big';

  // @IsArray()
  // @IsOptional()
  // color?: string[];

  // @IsNumber()
  // @IsOptional()
  // quantity?: number;

  // @IsString()
  // @IsOptional()
  // type?: 'dynamic' | 'static';

  // @IsString()
  // @IsOptional()
  // material?: string;

  // @IsString()
  // @IsOptional()
  // productFitting?: 'True to Size' | 'Runs Small' | 'Runs Big';

  // @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => CreateProductVariantDto)
  // variants: CreateProductVariantDto[];
}
