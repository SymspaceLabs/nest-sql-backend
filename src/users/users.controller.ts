import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  UseGuards,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import User from './entities/user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { RequestChangeEmailDto } from './dto/request-change-email.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    const users = await this.userService.getAllUsers();
    return users;
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    const user = await this.userService.getUserById(id);
    return user;
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createUser(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.userService.createUser(createUserDto);
    return newUser;
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<User> {
    const user = this.userService.deleteById(id);
    return user;
  }

  @Patch(':id/request-change-email')
  async requestChangeEmail(
    @Param('id') id: string,
    @Body() requestChangeEmailDto: RequestChangeEmailDto,
  ): Promise<{ message: string }> {
    await this.userService.requestChangeEmail(id, requestChangeEmailDto);
    return { message: 'OTP sent to new email' };
  }

  @Patch(':id/verify-otp')
  async verifyOtp(
    @Param('id') id: string,
    @Body() verifyOtpDto: VerifyOtpDto,
  ): Promise<{ message: string }> {
    await this.userService.verifyOtp(id, verifyOtpDto);
    return { message: 'Email updated successfully' };
  }
}
