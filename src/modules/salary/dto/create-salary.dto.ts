import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export enum PaymentMode {
    CASH = "cash",
    BANK = "bank"
}

export enum Status {
    APPROVED = "approved",
    PENDING = "pending",
    REJECTED = "rejected"
}

export class CreateSalaryDto {
    @ApiProperty({
        description: `The 'employee_id' of the employee`,
        example: "ObjectId"
    })
    @IsMongoId({ message: `'employee_id' must contain valid Mongo IDs` })
    @IsNotEmpty()
    employee_id: string;

    @ApiProperty({
        description: `The 'salary_month' of the employee`,
        example: 50000
    })
    @Type(() => Number)
    @IsNumber()
    @IsNotEmpty()
    salary_month: number;

    @ApiProperty({
        description: `The 'deduction_percentage' of the role`,
        example: 50000
    })
    @Type(() => Number)
    @IsNumber()
    @IsNotEmpty()
    gross_salary: number;

    @ApiProperty({
        description: `The 'deduction_percentage' of the role`,
        example: 50000
    })
    @Type(() => Number)
    @IsNumber()
    @IsNotEmpty()
    net_salary: number;

    @ApiProperty({
        description: `The 'deduction_percentage' of the role`,
        example: 10
    })
    @Type(() => Number)
    @IsNumber()
    @IsNotEmpty()
    advance_deduction: number;

    @ApiProperty({
        description: `The 'deduction_percentage' of the role`,
        example: "CASH | BACK"
    })
    @IsEnum(PaymentMode)
    @IsNotEmpty()
    payment_mode: PaymentMode;

    @ApiProperty({
        description: `The 'deduction_percentage' of the role`,
        example: "ObjectId"
    })
    @IsMongoId({ message: `'bank_account_id' must contain valid Mongo IDs` })
    @IsNotEmpty()
    bank_account_id: string;

    @ApiProperty({
        description: `The 'deduction_percentage' of the role`,
        example: "ObjectId"
    })
    @IsMongoId({ message: `'lot_id' must contain valid Mongo IDs` })
    @IsNotEmpty()
    lot_id: string;

    @ApiProperty({
        description: `The 'deduction_percentage' of the role`,
        example: "APPROVED | PENDING | REJECTED"
    })
    @IsEnum(Status)
    @IsOptional()
    status: Status;

    @ApiProperty({
        description: `The 'deduction_percentage' of the role`,
        example: true
    })
    @IsBoolean()
    @IsOptional()
    is_locked: boolean;
}