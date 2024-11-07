import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { RequestChangeEmailDto } from './dto/request-change-email.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';

export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getAllUsers() {
    const users = this.usersRepository.find();
    return users;
  }

  async getUserById(id: string) {
    const user = await this.usersRepository.findOne({
      where: {
        id: id,
      },
    });
    if (user) {
      return user;
    }
    throw new NotFoundException('Could not find the user');
  }

  async createUser(createUserDto: CreateUserDto) {
    const newUser = await this.usersRepository.create(createUserDto);
    await this.usersRepository.save({
      name: createUserDto.name,
      email: createUserDto.email,
      password: createUserDto.password,
    });
    return newUser;
  }

  async deleteById(id: string) {
    const user = await this.usersRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!user) {
      return null;
    }

    await this.usersRepository.remove(user);
    return user;
  }

  async verifyUser(email: string): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }

    user.isVerified = true;
    await this.usersRepository.save(user);
  }
  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async updatePassword(userId: number, newPassword: string): Promise<void> {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.usersRepository.update(userId, { password: hashedPassword });
  }

  async saveResetToken(
    userId: string,
    token: string,
    expiry: Date,
  ): Promise<void> {
    await this.usersRepository.update(userId, {
      resetToken: token,
      resetTokenExpiry: expiry,
    });
  }

  async requestChangeEmail(userId: string, requestChangeEmailDto: RequestChangeEmailDto): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Generate OTP and store it temporarily
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
    user.pendingEmail = requestChangeEmailDto.newEmail;
    user.otp = otp; // Save OTP temporarily
    user.otpExpiry = new Date(Date.now() + 10 * 60000); // OTP valid for 10 minutes
    await this.usersRepository.save(user);

    // Send OTP to new email
    // await this.emailService.sendOtp(user.pendingEmail, otp);
  }

  async verifyOtp(userId: string, verifyOtpDto: VerifyOtpDto): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if OTP matches and is still valid
    if (user.otp !== verifyOtpDto.otp || user.otpExpiry < new Date()) {
      throw new UnauthorizedException('Invalid or expired OTP');
    }

    // Update the user's email and clear OTP
    user.email = user.pendingEmail;
    user.pendingEmail = null;
    user.otp = null;
    user.otpExpiry = null;
    await this.usersRepository.save(user);
  }
}
