import { Module } from '@nestjs/common';
import { Product3dModelsService } from './product-3d-models.service';
import { Product3dModelsController } from './product-3d-models.controller';

@Module({
  controllers: [Product3dModelsController],
  providers: [Product3dModelsService],
})
export class Product3dModelsModule {}
