// dto/change-email.dto.ts
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ChangeEmailDto {
  @IsEmail()
  @IsNotEmpty()
  newEmail: string;
}
