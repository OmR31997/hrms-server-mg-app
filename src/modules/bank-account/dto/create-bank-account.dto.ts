import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsMongoId, IsNotEmpty, IsOptional, IsString, Matches } from "class-validator";

export class CreateBankAccountDto {

    @ApiProperty({
        description: `The 'employee_id' of the branch`,
        example: 'ObjectId',
    })
    @IsMongoId({ message: `'employee_id' must contain valid Mongo IDs` })
    @IsNotEmpty()
    employee_id: string;

    @ApiProperty({
        description: `The 'bank_name' of the branch`,
        example: 'SBI',
    })
    @IsString({ message: `'bank_name' must be string` })
    @IsNotEmpty()
    bank_name: string;

    @ApiProperty({
        description: `The 'account_no' of the branch`,
        example: 'BANK89370400440532013000',
    })
    @IsString({ message: `'account_no' must be string` })
    @Matches(/^[A-Z0-9]{8,34}$/i, {
        message: `'account_no' must contain only letters and numbers (8–34 characters)`
    })
    @IsNotEmpty()
    account_no: string;

    @ApiProperty({
        description: `IFSC (India) or SWIFT/BIC (international bank code)`,
        example: 'HDFC0001234',
    })
    @IsString({ message: `'ifsc' must be string` })
    @IsNotEmpty()
    ifsc: string;

    @ApiProperty({
        description: `The 'effective_from' of the branch`,
        example: '2024-04-01',
    })
    @IsDateString()
    @IsNotEmpty()
    effective_from: string;

    @ApiProperty({
        description: `The 'effective_to' of the branch`,
        example: '2025-04-01',
    })
    @IsOptional()
    effective_to: string;
}