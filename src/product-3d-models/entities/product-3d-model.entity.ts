import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';

@Entity()
export class Product3DModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string; // Optional: Name or identifier for the 3D model

  @Column()
  filePath: string; // Path to the 3D model file

  @Column({ nullable: true })
  format: string; // File format (e.g., glTF, OBJ, etc.)

  @OneToOne(() => Product, (product) => product.model, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  product: Product;
}
