import User from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Measurement {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'float', nullable: false })
  weight: number;

  @Column({ type: 'float', nullable: false })
  height: number;

  @Column({ type: 'float', nullable: true })
  chest?: number;

  @Column({ type: 'float', nullable: true })
  waist?: number;

  @Column({ type: 'enum', enum: ['cm/kg', 'feet/inch'], default: 'cm/kg' })
  metric: 'cm/kg' | 'feet/inch';

  @OneToOne(() => User, (user) => user.measurement, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
