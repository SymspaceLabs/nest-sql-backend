import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Expose, Exclude } from 'class-transformer';

@Entity()
export class ProductImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Expose()  // Only expose 'url' and 'altText' in the response
  @Column()
  url: string;

  @Expose()
  @Column({ nullable: true })
  altText: string;

  @ManyToOne(() => Product, (product) => product.images, {
    onDelete: 'CASCADE',
  })
  @Exclude()  // Exclude the 'product' relation from the response
  product: Product;
}
