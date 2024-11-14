import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { ProductImage } from 'src/product-images/entities/product-image.entity';
import { Stock } from 'src/stock/entities/stock.entity';
import { ProductVariantEntity } from '../../product-variant/entities/product-variant.entity';
import { Company } from 'src/companies/entities/company.entity';

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

  @Column()
  name: string;

  @Column({ type: 'float', nullable: true })
  price: number;

  @Column()
  category: string;

  @ManyToOne(() => Company, (company) => company.products, {
    onDelete: 'CASCADE', // If a company is deleted, all related products will also be deleted
  })
  company: Company;

  @Column()
  slug: string;

  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
  })
  images: ProductImage[];

  
  // @Column({
  //   type: 'enum',
  //   enum: ProductStatus,
  //   default: ProductStatus.DRAFT,
  // })
  // productStatus: ProductStatus;



  // @Column({ nullable: true })
  // threeDModel?: string;

  // @Column({
  //   type: 'enum',
  //   enum: ProductType,
  //   default: ProductType.STATIC,
  // })
  // productType: ProductType;

  // @Column({ type: 'boolean', default: false })
  // modelSize: boolean;

  // @Column()
  // productFitting: 'True to Size' | 'Runs Small' | 'Runs Big';

  // @Column({ nullable: true })
  // productSizes: string;

  // @Column({ nullable: true })
  // productColors: string;

  // @Column({ nullable: true })
  // productMaterial: string;

  // @Column({ type: 'boolean', default: false, nullable: true })
  // productDimensions: boolean;

  // @Column({ type: 'boolean', default: false, nullable: true })
  // productSizechart: boolean;

  // @Column({ nullable: true })
  // productInsurance?: string;

  // @Column({ nullable: true })
  // productBrand?: string;

  // @Column({ type: 'text', nullable: true })
  // productDescription: string;

  // @Column({ type: 'float', nullable: true })
  // strikethroughPrice?: number;

  // @Column({ type: 'boolean', default: false })
  // chargeTax: boolean;

  // @Column({ type: 'float', default: 0.0 })
  // costPerProduct: number;

  // @Column({ type: 'float', default: 0.0 })
  // profit: number;

  // @Column({ type: 'float', default: 0.0 })
  // margin: number;

  // @OneToMany(() => Stock, (stock) => stock.product, {
  //   cascade: true,
  // })
  // stocks: Stock[];
  // @Column()
  // createdAt: Date;

  // @OneToMany(() => ProductVariantEntity, (variant) => variant.product, {
  //   cascade: true,
  // })
  // variants: ProductVariantEntity[];
}
