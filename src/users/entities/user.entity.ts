import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Company } from '../../companies/entities/company.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  pendingEmail: string; // Temporarily holds the new email until OTP verification

  @Column({ nullable: true })
  otp: string; // Stores the OTP

  @Column({ type: 'timestamp', nullable: true })
  otpExpiry: Date; // Stores OTP expiry time

  @Column()
  password: string;

  @Column()
  role: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ nullable: true })
  resetToken: string;

  @Column({ nullable: true })
  resetTokenExpiry: Date;

  @OneToOne(() => Company, (company) => company.user)
  company: Company;
}

export default User;
