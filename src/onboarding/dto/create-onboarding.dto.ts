// src/onboarding/dto/create-onboarding.dto.ts
import { Type } from 'class-transformer';
import { IsNumber, IsDateString, IsOptional, IsString, IsDate } from 'class-validator';

export class CreateOnboardingDto {
  @IsString()
  userId: string;

  @IsNumber()
  height: number;

  @IsNumber()
  weight: number;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dob?: Date;

//   @IsOptional()
//   preferences?: Record<string, any>;
}
