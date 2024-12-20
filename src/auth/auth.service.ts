import {
  Injectable,
  UnauthorizedException,
  Logger,
  HttpException,
  ForbiddenException,
  PayloadTooLargeException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import User, { AuthMethod } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from './entities/auth.entity';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { MailchimpService } from '../mailchimp/mailchimp.service';
import { Company } from 'src/companies/entities/company.entity';
import { HttpService } from '@nestjs/axios';
import { RedisService } from '../redis/redis.service';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import * as validator from 'validator';
import * as bcrypt from 'bcrypt';
import * as jwksClient from 'jwks-rsa';
import axios from 'axios';



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

  private appleClient = jwksClient({
      jwksUri: 'https://appleid.apple.com/auth/keys',
  });

  async getApplePublicKey(kid: string): Promise<string> {
      const key = await this.appleClient.getSigningKey(kid);
      return key.getPublicKey();
  }

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
  
    if (!validator.isEmail(email)) {
      throw new HttpException('Invalid email address.', 402);
    }
  
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
        isOnboardingFormFilled: user.isOnboardingFormFilled,
      },
    };
  }

  async loginWithGoogle(idToken: string) {

    const googleUser = await this.parseJWT(idToken);

    const { email } = googleUser;

    

    let user = await this.usersRepository.findOne({
      where: { email },
    });

    try {
      if (!user) {
        user = this.usersRepository.create({
            email: googleUser.email,
            firstName: googleUser.firstName || '',
            lastName: googleUser.lastName || '',
            avatar: googleUser.picture || '',
            isVerified: true,
            role: 'buyer',
            password: '',
            authMethod: AuthMethod.GOOGLE,
  
        });
  
        await this.usersRepository.save(user);  
      }
    } catch (error) {
      console.error('Error saving user:', error.message);
      throw new Error('Failed to create user. Please check your data and try again.');
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
        avatar: user.avatar,
        isOnboardingFormFilled: user.isOnboardingFormFilled,
      },
    };
  }

  async loginWithApple(idToken: string) {
    const decodedHeader: any = jwt.decode(idToken, { complete: true });

    if (!decodedHeader || !decodedHeader.header || !decodedHeader.header.kid) {
      throw new UnauthorizedException('Invalid token');
    }

    const publicKey = await this.getApplePublicKey(decodedHeader.header.kid);

    try {
        const verifiedPayload:any = jwt.verify(idToken, publicKey, {
            algorithms: ['RS256'],
            issuer: 'https://appleid.apple.com',
            audience: 'com.symspacelabs.si', // Replace with your client ID
        });

        const { email } = verifiedPayload;

        let user = await this.usersRepository.findOne({
          where: { email },
        });

        if (!user) {
          user = this.usersRepository.create({
              email: email,
              firstName: verifiedPayload.firstName || '',
              lastName: verifiedPayload.lastName || '',
              avatar: verifiedPayload.picture || '',
              isVerified: true,
              role: 'buyer',
              password: '',
              authMethod: AuthMethod.APPLE,
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
            avatar: user.avatar,
            isOnboardingFormFilled: user.isOnboardingFormFilled,
          },
        };


      } catch (err) {
        throw new UnauthorizedException('Invalid token 2');
    }
  }

  async loginWithFacebook(accessToken: string) {
    try {
      // Fetch user info from Facebook
      const userInfoUrl = `https://graph.facebook.com/me?fields=id,first_name,last_name,email,picture&access_token=${accessToken}`;
      const userInfoResponse: any = await axios.get(userInfoUrl);
  
      const { email, first_name, last_name, picture } = userInfoResponse.data;
  
      // Check if user exists in the database
      let user = await this.usersRepository.findOne({
        where: { email },
      });
  
      if (!user) {
        // Create a new user if not found
        user = this.usersRepository.create({
          email: email,
          firstName: first_name || '',
          lastName: last_name || '',
          avatar: picture?.data?.url || '',
          isVerified: true,
          role: 'buyer',
          password: '',
          authMethod: AuthMethod.FACEBOOK,
        });
  
        await this.usersRepository.save(user);
      }
  
      // Generate a new access token
      const newAccessToken = this.jwtService.sign(
        { userId: user.id, email: user.email },
        { secret: process.env.JWT_SECRET, expiresIn: '1h' },
      );
  
      // Store the token in Redis
      await this.redisService
        .getClient()
        .set(`auth:${user.id}`, newAccessToken, 'EX', 3600);
  
      await this.authRepository.update(user.id, { refreshToken: newAccessToken });
  
      // Return the access token and user info
      return {
        accessToken: newAccessToken,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          avatar: user.avatar,
          isOnboardingFormFilled: user.isOnboardingFormFilled,
        },
      };
    } catch (error) {
      if (error.response?.data?.error?.type === 'OAuthException') {
        throw new UnauthorizedException('Invalid or expired Facebook access token');
      }
      throw new InternalServerErrorException('Error handling Facebook login');
    }
  }
  
  async verifyEmail(token: string): Promise<boolean> {
    try {
      const { email } = this.jwtService.verify(token);

      const user = await this.usersRepository.findOne({ where: { email } });
      if (!user) {
        throw new HttpException('User not found', 404);
      }

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

    this.validatePasswordFormat(newPassword);

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

  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new BadRequestException('User not found.');
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    
    if (!isMatch) {
      throw new BadRequestException('Current password is incorrect.');
    }

    if (currentPassword === newPassword) {
      throw new BadRequestException('New password cannot be the same as the current password.');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await this.usersRepository.save(user);

    return { message: 'Password updated successfully!' };
  }

  async findUserByEmail(email: string) {
    const user = this.usersRepository.findOne({
      where: { email },
    });

    return user;
  }

  async sendVerificationEmail(user: any): Promise<boolean> {
    try {
      const token = this.generateVerificationToken(user); // Implement token generation
      const verificationUrl = `${process.env.BACKEND_URL}/auth/verify-email?token=${token}`;
      await this.mailchimpService.sendVerificationEmail(user.email, verificationUrl)
      return true;
    } catch (error) {
      console.error('Failed to send verification email:', error);
      return false;
    }
  }

  private generateVerificationToken(user: any): string {
    const token = this.jwtService.sign(
      { userId: user.id, email: user.email, role: user.role },
      { secret: process.env.JWT_SECRET, expiresIn: '1h' },
    );
    return token;
  }

}
