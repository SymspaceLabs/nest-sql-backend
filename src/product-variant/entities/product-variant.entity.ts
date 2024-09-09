import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { ProductVariantPropertyEntity } from 'src/product-variant-property/entities/product-variant-property.entity';
import { PriceEntity } from 'src/price/entities/price.entity';

@Entity()
export class ProductVariantEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.variants)
  product: Product;

  @OneToMany(
    () => ProductVariantPropertyEntity,
    (variantProperty) => variantProperty.variant,
    { cascade: true },
  )
  properties: ProductVariantPropertyEntity[];

  @OneToMany(() => PriceEntity, (price) => price.variant, { cascade: true })
  prices: PriceEntity[];
}
