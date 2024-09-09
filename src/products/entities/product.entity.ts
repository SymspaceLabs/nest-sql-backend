import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProductImage } from 'src/product-images/entities/product-image.entity';
import { Stock } from 'src/stock/entities/stock.entity';
import { ProductVariantEntity } from '../../product-variant/entities/product-variant.entity';

export enum ProductStatus {
  ACTIVE = 'Active',
  DRAFT = 'Draft',
  INACTIVE = 'InActive',
}

export enum ProductType {
  STATIC = 'Static',
  DYNAMIC = 'Dynamic',
}

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: ProductStatus,
    default: ProductStatus.DRAFT,
  })
  productStatus: ProductStatus;

  // @Column()
  @Column()
  name: string;

  @OneToMany(() => ProductImage, (productImages) => productImages.product, {
    cascade: true,
  })
  images: ProductImage[];

  @Column({ nullable: true })
  threeDModel?: string;

  @Column({
    type: 'enum',
    enum: ProductType,
    default: ProductType.STATIC,
  })
  productType: ProductType;

  @Column()
  category: string;

  @Column({ type: 'boolean', default: false })
  modelSize: boolean;

  @Column()
  productFitting: 'True to Size' | 'Runs Small' | 'Runs Big';

  @Column({ nullable: true })
  productSizes: string;

  @Column({ nullable: true }) //'simple-array')
  productColors: string;

  @Column({ nullable: true })
  productMaterial: string;

  @Column({ type: 'boolean', default: false, nullable: true })
  productDimensions: boolean;

  @Column({ type: 'boolean', default: false, nullable: true })
  productSizechart: boolean;

  @Column({ nullable: true })
  productInsurance?: string;

  @Column({ type: 'text', nullable: true })
  productDescription: string;

  @Column({ type: 'float', nullable: true })
  price: number;

  @Column({ type: 'float', nullable: true })
  strikethroughPrice?: number;

  @Column({ type: 'boolean', default: false })
  chargeTax: boolean;

  @Column({ type: 'float', default: 0.0 })
  costPerProduct: number;

  @Column({ type: 'float', default: 0.0 })
  profit: number;

  @Column({ type: 'float', default: 0.0 })
  margin: number;

  @OneToMany(() => Stock, (stock) => stock.product, {
    cascade: true,
  })
  stocks: Stock[];
  @Column()
  createdAt: Date;

  @OneToMany(() => ProductVariantEntity, (variant) => variant.product, {
    cascade: true,
  })
  variants: ProductVariantEntity[];
}
