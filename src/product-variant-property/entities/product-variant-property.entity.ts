import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ProductVariantEntity } from 'src/product-variant/entities/product-variant.entity';

@Entity()
export class ProductVariantPropertyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @Column()
  value: string;

  @ManyToOne(() => ProductVariantEntity, (variant) => variant.properties)
  variant: ProductVariantEntity;
}
