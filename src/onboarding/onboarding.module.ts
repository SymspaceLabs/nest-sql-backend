import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OnboardingService } from './onboarding.service';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { MeasurementsModule } from '../measurements/measurements.module';
import { Measurement } from 'src/measurements/entities/measurement.entity';
import { OnboardingController } from './onboarding.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Measurement]),
    UsersModule,
    MeasurementsModule,
  ],
  controllers: [OnboardingController],
  providers: [OnboardingService],
  exports: [OnboardingService],
})
export class OnboardingModule {}
