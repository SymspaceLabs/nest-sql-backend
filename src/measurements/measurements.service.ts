import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMeasurementDto } from './dto/create-measurement.dto';
import { UpdateMeasurementDto } from './dto/update-measurement.dto';
import { Measurement } from './entities/measurement.entity';

@Injectable()
export class MeasurementsService {
  constructor(
    @InjectRepository(Measurement)
    private readonly measurementRepository: Repository<Measurement>,
  ) {}

  // Create a new measurement
  async create(createMeasurementDto: CreateMeasurementDto) {
    const { weight, heightFeet, heightInches, heightCm, chest, waist, metric } = createMeasurementDto;

    let height = 0;

    // Handle the height depending on the metric
    if (metric === 'feet/inch') {
      height = heightFeet * 12 + heightInches; // Convert to inches
    } else if (metric === 'cm/kg') {
      height = heightCm; // Directly use the height in cm
    }

    // Create a new measurement record with the calculated height
    const measurement = this.measurementRepository.create({
      weight,
      height,
      chest,
      waist,
      metric,
    });

    return await this.measurementRepository.save(measurement);
  }

  // Get all measurements
  async findAll() {
    return await this.measurementRepository.find();
  }

  // Get a single measurement by id
  async findOne(id: string) {
    return await this.measurementRepository.findOne({ where: { id } });
  }
  
  // Update a measurement by id
  async update(id: string, updateMeasurementDto: UpdateMeasurementDto) {
    const { weight, heightFeet, heightInches, heightCm, chest, waist, metric } = updateMeasurementDto;

    let height = 0;

    // Handle the height depending on the metric
    if (metric === 'feet/inch') {
      height = heightFeet * 12 + heightInches; // Convert to inches
    } else if (metric === 'cm/kg') {
      height = heightCm; // Directly use the height in cm
    }

    const measurement = await this.measurementRepository.preload({
      id,
      weight,
      height,
      chest,
      waist,
      metric,
    });

    if (!measurement) {
      throw new Error('Measurement not found');
    }

    return await this.measurementRepository.save(measurement);
  }

  // Remove a measurement by id
  async remove(id: string) {
    const measurement = await this.measurementRepository.findOne({ where: { id } });
  
    if (!measurement) {
      throw new Error('Measurement not found');
    }
  
    return await this.measurementRepository.remove(measurement);
  }
  
}
