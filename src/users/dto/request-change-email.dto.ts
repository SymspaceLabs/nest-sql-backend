// src/user/dto/request-change-email.dto.ts
import { IsEmail, IsNotEmpty } from 'class-validator';

export class RequestChangeEmailDto {
  @IsEmail()
  @IsNotEmpty()
  newEmail: string;
}


