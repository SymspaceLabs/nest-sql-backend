import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OnboardingService } from './onboarding.service';
import { CreateOnboardingDto } from './dto/create-onboarding.dto';
import { UpdateOnboardingDto } from './dto/update-onboarding.dto';

@Controller('onboarding')
export class OnboardingController {
  constructor(private readonly onboardingService: OnboardingService) {}

  @Post()
  async create(@Body() createOnboardingDto: CreateOnboardingDto) {
    const { userId } = createOnboardingDto;
    return await this.onboardingService.create(createOnboardingDto, userId);
  }

}
