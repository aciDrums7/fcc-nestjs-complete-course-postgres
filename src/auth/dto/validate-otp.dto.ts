import { IsNotEmpty, IsString } from 'class-validator';

export class ValidateOtpDTO {
  @IsString()
  @IsNotEmpty()
  otp: string;
}
