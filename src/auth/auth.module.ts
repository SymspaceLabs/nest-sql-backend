import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import User from '../users/entities/user.entity';
import { Company } from 'src/companies/entities/company.entity'; // Import the Company entity
import { Auth } from './entities/auth.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtGuard } from './jwt-auth.guard';
import { MailchimpModule } from '../mailchimp/mailchimp.module';
import { UsersModule } from '../users/users.module';
import { HttpModule, HttpService } from '@nestjs/axios'; // Import the UsersModule
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => {
        return {
          secret: process.env.JWT_SECRET,
          signOptions: {
            expiresIn: 1500,
          },
        };
      },
    }),
    UsersModule,
    AuthModule,
    MailchimpModule,
    TypeOrmModule.forFeature([User, Company, Auth]), // Include Company entity here
    HttpModule,
    RedisModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    JwtGuard,
  ],
  exports: [AuthService, JwtStrategy, PassportModule, RedisModule],
})
export class AuthModule {}
