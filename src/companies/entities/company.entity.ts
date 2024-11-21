import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  BeforeInsert,
  BeforeUpdate
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  businessName: string;

  @Column()
  website: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  // One Company has many Products
  @OneToMany(() => Product, (product) => product.company)
  products: Product[];

  @Column({ unique: true })
  slug: string;

  // Generate slug before inserting or updating
  @BeforeInsert()
  @BeforeUpdate()
  generateSlug() {
    if (this.businessName) {
      this.slug = this.businessName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
        .replace(/^-+|-+$/g, ''); // Trim hyphens at start and end
    }
  }
}
