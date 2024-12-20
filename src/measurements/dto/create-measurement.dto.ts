import { IsInt, IsOptional, IsEnum, IsNotEmpty, Min } from 'class-validator';

export class CreateMeasurementDto {
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  weight: number; // Weight in kg (can be float if necessary)

  @IsOptional() // Optional because it might not be used when metric is cm/kg
  @IsInt()
  heightFeet?: number; // Height in feet (only when metric is 'feet/inch')

  @IsOptional() // Optional because it might not be used when metric is cm/kg
  @IsInt()
  heightInches?: number; // Height in inches (only when metric is 'feet/inch')

  @IsOptional() // Optional because it might not be used when metric is 'feet/inch'
  @IsInt()
  heightCm?: number; // Height in centimeters (only when metric is 'cm/kg')

  @IsOptional()
  @IsInt()
  chest?: number; // Chest measurement (optional)

  @IsOptional()
  @IsInt()
  waist?: number; // Waist measurement (optional)

  @IsNotEmpty()
  @IsEnum(['cm/kg', 'feet/inch']) // Only allows 'cm/kg' or 'feet/inch'
  metric: 'cm/kg' | 'feet/inch'; // Metric used for the measurements
}
