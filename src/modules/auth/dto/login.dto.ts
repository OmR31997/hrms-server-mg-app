// dto/login.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsNumber } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: `The 'name' of the role`,
    example: 'abc@gmail.com'
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: `The 'password' of the role`,
    example: '********'
  })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({
    description: `The 'otp' of the role`,
    example: '6-Digit OTP code'
  })
  @IsOptional()
  otp?: string;
}
