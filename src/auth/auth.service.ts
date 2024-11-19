import {
  Injectable,
  UnauthorizedException,
  Logger,
  HttpException,
  HttpStatus,
  ForbiddenException,
  PayloadTooLargeException,
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
import * as validator from 'validator';

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

  private validateFields(
    fields: Record<string, any>,
    requiredFields: string[],
  ): string[] {
    const missingFields = requiredFields.filter((field) => !fields[field]);
    return missingFields;
  }

  private validatePasswordFormat(password: string): void {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#+])[A-Za-z\d@$!%*?&#+]{8,}$/;
    if (!passwordRegex.test(password)) {
      throw new ForbiddenException(
        'Password must be at least 8 characters long and include an uppercase letter, a number, and a special character.',
      );
    }
  }

  private async parseJWT(idToken: string): Promise<any> {
    try {
      const decodedHeader: any = jwt.decode(idToken, { complete: true });
      const payload = decodedHeader.payload;
      const { sub, email, email_verified, name, picture, given_name, family_name } = payload;

      return {
        userId: sub,
        email,
        emailVerified: email_verified,
        name,
        firstName: given_name,
        lastName: family_name,
        picture,
      }
    } catch (error) {
      throw new Error('Invalid ID token');
    }
  }

  async signUpSeller(
    signUpDto: SignUpDto,
  ): Promise<{ message: string; token?: string }> {
    const requiredFields = [
      'firstName',
      'lastName',
      'email',
      'password',
      'businessName',
      'website',
    ];
  
    const missingFields = this.validateFields(signUpDto, requiredFields);
  
    if (missingFields.length > 0) {
      throw new UnauthorizedException(
        `Missing required field(s): ${missingFields.join(', ')}.`,
      );
    }
  
    const { password, email } = signUpDto;
  
    // Validate email format
    if (!validator.isEmail(email)) {
      throw new HttpException('Invalid email address.', 402);
    }
  
    // Validate password format
    this.validatePasswordFormat(password);
  
    const { firstName, lastName, role = 'seller', businessName, website } =
      signUpDto;
  
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
        userId: user.id,
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
  
  async signUp(
    signUpDto: SignUpDto,
  ): Promise<{ message: string; token?: string }> {
    const requiredFields = ['firstName', 'lastName', 'email', 'password'];
  
    const missingFields = this.validateFields(signUpDto, requiredFields);
  
    if (missingFields.length > 0) {
      throw new UnauthorizedException(
        `Missing required field(s): ${missingFields.join(', ')}.`,
      );
    }
  
    const { password, email } = signUpDto;
  
    // Validate email format
    if (!validator.isEmail(email)) {
      throw new HttpException('Invalid email address.', 402); // Custom 402 error
    }
  
    // Validate password format
    this.validatePasswordFormat(password);
  
    const { firstName, lastName, role = 'buyer', businessName, website } =
      signUpDto;
  
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
        userId: user.id,
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
      throw new UnauthorizedException('Account not found');
    }

    // Check if the user is verified
    if (!user.isVerified) {
      throw new PayloadTooLargeException('Your email is not verified. Please check your inbox to verify your email.');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid password');
    }

    const accessToken = this.jwtService.sign(
      { userId: user.id, email: user.email },
      { secret: process.env.JWT_SECRET, expiresIn: '1h' },
    );

    // Store the token in Redis
    await this.redisService
      .getClient()
      .set(`auth:${user.id}`, accessToken, 'EX', 3600);

    await this.authRepository.update(user.id, { refreshToken: accessToken });

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

  async loginWithGoogle(idToken: string) {

    const googleUser = await this.parseJWT(idToken);

    const { email } = googleUser;

    let user = await this.usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      user = this.usersRepository.create({
          email: googleUser.email,
          firstName: googleUser.firstName || '',
          lastName: googleUser.lastName || '',
          isVerified: true,
          role: 'buyer',
          password: '',
      });

      await this.usersRepository.save(user);
    }

    const accessToken = this.jwtService.sign(
      { userId: user.id, email: user.email },
      { secret: process.env.JWT_SECRET, expiresIn: '1h' },
    );

    // Store the token in Redis
    await this.redisService
      .getClient()
      .set(`auth:${user.id}`, accessToken, 'EX', 3600);

    await this.authRepository.update(user.id, { refreshToken: accessToken });

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

  async verifyEmail(token: string): Promise<boolean> {
    try {
      // Verify and decode the token
      const { email } = this.jwtService.verify(token);

      // Find the user by email
      const user = await this.usersRepository.findOne({ where: { email } });
      if (!user) {
        throw new HttpException('User not found', 404);
      }

      // Activate the user
      user.isVerified = true;
      await this.usersRepository.save(user);

      return true;
    } catch (error) {
      this.logger.error(`Email verification failed: ${error.message}`);
      if (error.name === 'TokenExpiredError') {
        throw new HttpException(
          'Email verification token has expired. Please request a new verification link.',
          441,
        );
      } else {
        throw new HttpException(
          'Invalid verification token.',
          400,
        );
      }
    }
  }

  async generateResetToken(email: string): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { email } });
    
    if (!user) {
      throw new HttpException('No account found with this email. Please verify your email and try again.', 421);
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expiry = new Date();
    expiry.setHours(expiry.getHours() + 1);

    user.resetToken = token;
    user.resetTokenExpiry = expiry;
    await this.usersRepository.save(user);

    await this.mailchimpService.sendPasswordResetEmail(email, token);
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const user = await this.usersRepository.findOne({
      where: { resetToken: token },
    });

    if (!user || user.resetTokenExpiry < new Date()) {
      throw new HttpException('Your password reset link has expired. Please request a new link', 422);
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await this.usersRepository.save(user);
  }

  async validateGoogleUser(googleUser: any): Promise<any> {
    let user = await this.authRepository.findOne({
      where: { email: googleUser.user.email },
    });

    if (!user) {
      user = this.authRepository.create({
        email: googleUser.user.email,
        firstName: googleUser.user.firstName,
        lastName: googleUser.user.lastName,
        isVerified: true,
        role: 'buyer',
        password: null,
      });
      await this.authRepository.save(user);
    } else {
      await this.authRepository.update(user.id, {
        email: googleUser.user.email,
        firstName: googleUser.user.firstName,
        lastName: googleUser.user.lastName,
        isVerified: true,
        role: 'buyer',
        password: null,
      });
      await this.authRepository.save(user);
    }

    let userData = await this.usersRepository.findOne({
      where: { email: googleUser.user.email },
    });
    if (!userData) {
      userData = this.usersRepository.create({
        email: googleUser.user.email,
        firstName: googleUser.user.firstName,
        lastName: googleUser.user.lastName,
        isVerified: true,
        role: 'buyer',
        password: 'buyer123',
      });
      await this.usersRepository.save(userData);
    } else {
      await this.usersRepository.update(userData.id, {
        email: googleUser.user.email,
        firstName: googleUser.user.firstName,
        lastName: googleUser.user.lastName,
        isVerified: true,
      });
      await this.usersRepository.save(userData);
    }

    const payload = { userId: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1h',
    });

    // Store the token in Redis
    await this.redisService
      .getClient()
      .set(`auth:${user.id}`, token, 'EX', 3600);

    await this.authRepository.update(user.id, { refreshToken: token });

    console.log('reslocal', user);
    return {
      user: {
        ...user,
        refreshToken: token,
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
