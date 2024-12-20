import { Injectable } from '@nestjs/common';
import { CreateOnboardingDto } from './dto/create-onboarding.dto';
import { UpdateOnboardingDto } from './dto/update-onboarding.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Measurement } from 'src/measurements/entities/measurement.entity';
import User from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OnboardingService {
  
  constructor(
    @InjectRepository(Measurement)
    private readonly measurementRepository: Repository<Measurement>, // Inject MeasurementRepository
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>, // Inject UserRepository
  ) {}

  async create(createOnboardingDto: CreateOnboardingDto, userId: string) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) throw new Error('User not found');
  
    // Step 1: Check if measurement data already exists for the user
    const existingMeasurement = await this.measurementRepository.findOne({ where: { user: { id: userId } } });
  
    if (existingMeasurement) {
      // If measurement exists, update it
      existingMeasurement.height = createOnboardingDto.height;
      existingMeasurement.weight = createOnboardingDto.weight;
      await this.measurementRepository.save(existingMeasurement);
    } else {
      // If no measurement exists, create a new one
      const { height, weight } = createOnboardingDto;
      const measurement = this.measurementRepository.create({ height, weight, user });
      await this.measurementRepository.save(measurement);
    }
  
    // Step 2: Update user data
    user.dob = createOnboardingDto.dob ? new Date(createOnboardingDto.dob) : null;


    user.isOnboardingFormFilled = true;
    await this.usersRepository.save(user);
  
    return {
      message: 'Onboarding completed successfully',
      user: { id: user.id, dob: user.dob },
      isOnboardingFormFilled: user.isOnboardingFormFilled,
    };
  }
  

}
