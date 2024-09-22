import { Injectable, OnModuleDestroy, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
  private readonly redis: Redis;
  private readonly logger = new Logger(RedisService.name);


  constructor(private configService: ConfigService) {
    this.redis = new Redis({
      host: this.configService.get('REDIS_HOST'),
      port: this.configService.get('REDIS_PORT'),
      password: this.configService.get('REDIS_PASSWORD'),
    });


    this.redis.on('connect', () => {
      this.logger.log('Successfully connected to Redis');
    });


    this.redis.on('error', (error) => {
      this.logger.error('Redis connection error:', error);
    });
  }


  getClient(): Redis {
    return this.redis;
  }


  async onModuleDestroy() {
    await this.redis.quit();
  }
}