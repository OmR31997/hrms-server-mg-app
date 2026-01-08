import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';
export enum PaymentMode {
  ONLINE = "online",
  CASH = "cash"
}

export class CreateSalaryPaymentDto {
  @ApiProperty({
    description: 'Salary reference ID',
    example: '64f1c2e9c8b4a12f9d123456',
  })
  @IsMongoId({ message: `'salary_id' must be a valid MongoDB ObjectId` })
  @IsNotEmpty({ message: `'salary_id' must be required` })
  salary_id: string;

  @ApiProperty({
    description: 'Mode of payment',
    example: 'bank_transfer',
  })
  @IsEnum(PaymentMode)
  @IsNotEmpty({ message: `'payment_mode' must be required` })
  payment_mode: PaymentMode;

  @ApiProperty({
    description: 'Paid amount',
    example: 50000,
  })
  @Type(() => Number)
  @IsNumber({}, { message: `'amount' must be a number` })
  @IsNotEmpty({ message: `'amount' must be required` })
  amount: number;

  @ApiProperty({
    description: 'Transaction reference number',
    example: 'TXN-2024-001',
  })
  @IsString({ message: `'transaction_ref' must be a string` })
  @IsNotEmpty({ message: `'transaction_ref' must be required` })
  transaction_ref: string;
}
