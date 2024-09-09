import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ProductVariantEntity } from 'src/product-variant/entities/product-variant.entity';

@Entity()
export class PriceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @ManyToOne(() => ProductVariantEntity, (variant) => variant.prices)
  variant: ProductVariantEntity;
}
