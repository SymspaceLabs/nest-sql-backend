import {
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
  HttpException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { RequestChangeEmailDto } from './dto/request-change-email.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { MailchimpService } from 'src/mailchimp/mailchimp.service';
import { ChangeEmailDto } from './dto/change-email.dto';

export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly mailchimpService: MailchimpService,
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
      relations: ['measurement'],
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

  async changeEmail(
      userId: number,
      changeEmailDto: ChangeEmailDto,
    ): Promise<{ message: string }> {
      const { newEmail } = changeEmailDto;

      // Validate email format
      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(newEmail)) {
        throw new HttpException('Invalid email format', 473);
      }

      // Check if the new email is already in use
      const existingUser = await this.usersRepository.findOne({
        where: { email: newEmail },
      });
      if (existingUser) {
        throw new HttpException('Email is already in use', 471);
      }

      // Update the user's email
      await this.usersRepository.update(userId, { email: newEmail });

      return { message: 'Email updated successfully' };
  }

  async editUser(userId: string, updates: Partial<User>): Promise<{ user: User; message: string }> {
    // Find the user by ID
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Apply the updates to the user entity
    Object.assign(user, updates);

    // Validate and save the updated user
    try {
      const updatedUser = await this.usersRepository.save(user);
      return {
        user: updatedUser,
        message: 'User information updated successfully',
      };
    } catch (error) {
      throw new BadRequestException('Failed to update user information');
    }
  }

}
