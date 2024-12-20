import {
  Body,
  Controller,
  Post,
  UseGuards,
  Res,
  Req,
  Get,
  HttpStatus,
  Query,
  BadRequestException,
  HttpCode,
  UnauthorizedException,
  HttpException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { MailchimpService } from 'src/mailchimp/mailchimp.service';
import { JwtService } from '@nestjs/jwt';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('auth')
export class AuthController {
  usersService: UsersService;
  constructor(
    private authService: AuthService,
    private mailChimpService: MailchimpService,
    private jwtService: JwtService,
  ) {}

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto, @Res() res: Response) {
    const result = await this.authService.signUp(signUpDto);
    if (result.token) {
      return res.status(HttpStatus.CREATED).json(result);
    } else {
      return res.status(HttpStatus.CONFLICT).json(result);
    }
  }

  @Post('signup-seller')
  async signUpSeller(@Body() signUpDto: SignUpDto, @Res() res: Response) {
    const result = await this.authService.signUpSeller(signUpDto);
    if (result.token) {
      return res.status(HttpStatus.CREATED).json(result);
    } else {
      return res.status(HttpStatus.CONFLICT).json(result);
    }
  }

  @Get('verify-email')
  async verifyEmail(@Query('token') token: string, @Res() res) {
    const { role } = this.jwtService.verify(token);
    try {
      await this.authService.verifyEmail(token);
      let redirectUrl;
      if (role === 'seller') {
        redirectUrl = `${process.env.FRONTEND_URL}/vendor/dashboard`;
      } else {
        redirectUrl = `${process.env.FRONTEND_URL}/login`;
      }
      return res.redirect(redirectUrl);
    } catch (error) {
      return res.redirect(
        `${process.env.FRONTEND_URL}/email-verification-failed`,
      );
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('login/google')
  @HttpCode(HttpStatus.OK)
  async loginWithGoogle(@Body('idToken') idToken: string) {
    try {
      return await this.authService.loginWithGoogle(idToken);
    } catch (error) {
      throw new UnauthorizedException('Google authentication failed');
    }
  }

  @Post('login/apple')
  @HttpCode(HttpStatus.OK)
  async loginWithApple(@Body('idToken') idToken: string) {
    try {
      return await this.authService.loginWithApple(idToken);
    } catch (error) {
      throw new UnauthorizedException('Apple authentication failed');
    }
  }

  @Post('login/facebook')
  @HttpCode(HttpStatus.OK)
  async loginWithFacebook(@Body('accessToken') accessToken: string) {
    try {
      return await this.authService.loginWithFacebook(accessToken);
    } catch (error) {
      if (error.response?.status === 400 && error.response?.data?.error?.type === 'OAuthException') {
        throw new UnauthorizedException('Invalid or expired Facebook access token');
      }
      throw new UnauthorizedException('Facebook authentication failed');
    }
  }


  @Get('logout') 
  async logout(@Req() req: Request, @Res() res: Response) {
    res.clearCookie('auth_token', { path: '/', httpOnly: true, sameSite: 'lax' });
    res.status(200).json({ message: 'Logged out successfully' });
  }

  @Get('/facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('/callback/facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginRedirect(@Req() req: any): Promise<any> {
    return {
      statusCode: HttpStatus.OK,
      data: req.user,
    };
  }

  @Get('github')
  @UseGuards(AuthGuard('github'))
  async githubAuth() {
    // initiates the GitHub OAuth2 login flow
  }

  @Get('callback/github')
  @UseGuards(AuthGuard('github'))
  githubAuthRedirect(@Req() req, @Res() res: Response) {
    const { user, accessToken } = req.user;
    const frontendRedirectUrl = `${process.env.FRONTEND_URL}/auth/callback?user=${encodeURIComponent(
      JSON.stringify(user),
    )}&accessToken=${accessToken}`;
    return res.redirect(frontendRedirectUrl);
  }

  @Get('apple')
  @UseGuards(AuthGuard('apple'))
  async appleAuth() {
    // Initiates the Apple OAuth2 login flow
  }

  @Get('/callback/apple')
  @UseGuards(AuthGuard('apple'))
  appleAuthRedirect(@Req() req, @Res() res: Response) {
    const { user, accessToken } = req.user;

    const frontendRedirectUrl = `${process.env.FRONTEND_URL}/auth/callback?user=${encodeURIComponent(
      JSON.stringify(user),
    )}&accessToken=${accessToken}`;
    return res.redirect(frontendRedirectUrl);
  }

  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    try {
      await this.authService.generateResetToken(email);
      return {
        message: 'Password reset url has been sent to your email',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('reset-password')
  async resetPassword(
    @Body('token') token: string,
    @Body('newPassword') newPassword: string,
  ) {
    try {
      await this.authService.resetPassword(token, newPassword);
      return {
        message: 'Password reset successful!',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('/send-email')
  async sendEmail(
    @Body('email') email: string,
    @Body('verificationUrl') verificationUrl: string,
  ) {
    return this.mailChimpService.sendEmail(email, verificationUrl);
  }

  @Post('change-password')
  @UseGuards(AuthGuard('jwt'))
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,  // Body contains the change password request
    @Req() req: any,  // Request object, contains user info
  ) {
    const { currentPassword, newPassword } = changePasswordDto;
    const userId = req.user.id;  // Extract user ID from the decoded JWT token
    return await this.authService.changePassword(userId, currentPassword, newPassword);

    try {
    } catch (error) {
      throw new BadRequestException(error.message);  // Handle and propagate errors
    }
  }

  @Post('resend-verification')
  async resendVerification(@Body() resendVerificationDto: any) {
    const { email } = resendVerificationDto;
    const user = await this.authService.findUserByEmail(email);

    if (!user) {
      throw new HttpException(
        'User not found. Please register first.',
        HttpStatus.NOT_FOUND,
      );
    }
    
    if (user.isVerified) {
      throw new HttpException(
        'Account is already verified.',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Resend the verification email
    const success = await this.authService.sendVerificationEmail(user);
    if (!success) {
      throw new HttpException(
        'Failed to send verification email. Please try again later.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return {
      message: 'Verification email has been resent successfully.',
      status: 'success',
    };
  }

}
