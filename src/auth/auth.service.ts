import {
  Injectable,
  UnauthorizedException,
  Logger,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from '../users/entities/user.entity';
import { Auth } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { MailchimpService } from '../mailchimp/mailchimp.service';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import { Company } from 'src/companies/entities/company.entity';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { RedisService } from '../redis/redis.service';


@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
    @InjectRepository(Company)
    private readonly companiesRepository: Repository<Company>,

    private jwtService: JwtService,
    private redisService: RedisService,
    private readonly mailchimpService: MailchimpService,
    private readonly httpService: HttpService,
  ) {}

  async signUp(
    signUpDto: SignUpDto,
  ): Promise<{ message: string; token?: string }> {
    const {
      firstName,
      lastName,
      email,
      password,
      role = 'buyer',
      businessName,
      website,
    } = signUpDto;

    const existingUser = await this.usersRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      return { message: 'Email already exists. Please use a different email.' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.usersRepository.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });

    await this.usersRepository.save(user);

    if (role === 'seller') {
      const company = this.companiesRepository.create({
        userId: user.id, // Assuming you have a userId field in your companies table
        businessName,
        website,
      });
      await this.companiesRepository.save(company);
    }

    const token = this.jwtService.sign(
      { userId: user.id, email: user.email, role: user.role },
      { secret: process.env.JWT_SECRET, expiresIn: '1h' },
    );

    const verificationUrl = `${process.env.BACKEND_URL}/auth/verify-email?token=${token}`;

    await this.mailchimpService.sendVerificationEmail(email, verificationUrl);

    return {
      message:
        'Registration successful. Please check your email to verify your account.',
      token,
    };
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string; user: any }> {
    const { email, password } = loginDto;

    const user = await this.usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const accessToken = this.jwtService.sign(
      { userId: user.id, email: user.email },
      { secret: process.env.JWT_SECRET, expiresIn: '1h' },
    );

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  }

  async googleLogin(req: any) {
    if (!req.user) {
      throw new UnauthorizedException('No user from Google');
    }

    try {
      const { user, token } = await this.validateGoogleUser(req.user);

      // You might want to perform additional logic here, such as updating last login time

      return {
        message: 'Successfully authenticated with Google',
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
        token
      };
    } catch (error) {
      this.logger.error(`Google authentication failed: ${error.message}`);
      throw new UnauthorizedException('Failed to authenticate with Google');
    }
    // return {
    //   message: 'User Info from Google',
    //   user: req.user,
    // };
  }

  async oAuthLogin(req: any) {
    if (!req.user) {
      throw new Error('User not found!!!');
    }

    const payload = {
      email: req.user.email,
      name: req.user.name,
    };

    const jwt = await this.jwtService.sign(payload);

    return { jwt };
  }

  async generateVerificationToken(email: string): Promise<string> {
    const payload = { email };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1h',
    });
  }

  async verifyToken(token: string): Promise<any> {
    return this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
  }

  async verifyEmail(token: string): Promise<boolean> {
    try {
      // Verify and decode the token
      const { email } = this.jwtService.verify(token);

      // Find the user by email
      const user = await this.usersRepository.findOne({ where: { email } });
      if (!user) {
        throw new Error('User not found');
      }

      // Activate the user
      user.isVerified = true;
      await this.usersRepository.save(user);

      return true;
    } catch (error) {
      this.logger.error(`Email verification failed: ${error.message}`);
      return false;
    }
  }

  async requestPasswordReset(email: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    await this.mailchimpService.sendPasswordResetEmail(user.email, token);
  }

  async generateResetToken(email: string): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expiry = new Date();
    expiry.setHours(expiry.getHours() + 1);

    user.resetToken = token;
    user.resetTokenExpiry = expiry;
    await this.usersRepository.save(user);

    await this.mailchimpService.sendPasswordResetEmail(email, token);
  }

  async revokeGoogleToken(accessToken: string) {
    const url = `https://oauth2.googleapis.com/revoke?token=${accessToken}`;
    const result = await firstValueFrom(this.httpService.post(url));
    return result.data;
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const user = await this.usersRepository.findOne({
      where: { resetToken: token },
    });
    if (!user || user.resetTokenExpiry < new Date()) {
      throw new Error('Token is invalid or expired');
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await this.usersRepository.save(user);
  }
  async validateGoogleUser(googleUser: any): Promise<any> {
    let user = await this.authRepository.findOne({ where: { email: googleUser.email } });
    if (!user) {
      user = this.authRepository.create({
        email: googleUser.email,
        firstName: googleUser.given_name,
        lastName: googleUser.family_name,
        isVerified: true,
        role: 'buyer',
        password: null,
      });
      await this.authRepository.save(user);
    }

    const payload = { userId: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload, { 
      secret: process.env.JWT_SECRET, 
      expiresIn: '1h' 
    });

    // Store the token in Redis
    await this.redisService.getClient().set(`auth:${user.id}`, token, 'EX', 3600);

    await this.authRepository.update(user.id, { refreshToken: token });

    return {
      user: {
        ...user,
        refreshToken: token
      },
      token,
    };
  }

  async logout(userId: string): Promise<void> {
    try {
      const redisClient = this.redisService.getClient();
      await redisClient.del(`auth:${userId}:access`);
      await redisClient.del(`auth:${userId}:refresh`);
      await this.authRepository.update(userId, { refreshToken: null });
      this.logger.log(`User logged out: ${userId}`);
    } catch (error) {
      this.logger.error(`Error in logout: ${error.message}`, error.stack);
      throw error;
    }
  }
}
