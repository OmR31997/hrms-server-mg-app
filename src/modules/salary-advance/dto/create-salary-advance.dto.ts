import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsMongoId, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateSalaryAdvanceDto {
    @ApiProperty({
        description: `The 'employee_id' of the employee`,
        example: 'ObjectId'
    })
    @IsMongoId({ message: `'employee_id' must contain valid Mongo IDs` })
    employee_id: string;

    @ApiProperty({
        description: `'requested_amount'`,
        example: 50000
    })
    @Type(() => Number)
    @IsNumber({}, { message: `'requested_amount' must be number` })
    requested_amount: number;

    @ApiProperty({
        description: `The 'approved_amount' of the role`,
        example: 4000
    })
    @Type(() => Number)
    @IsNumber({}, { message: `'approved_amount' must be number` })
    approved_amount: number;

    @ApiProperty({
        description: `The 'deduction_percentage' of the role`,
        example: 5
    })
    @Type(() => Number)
    @IsNumber({}, { message: `'deduction_percentage' must be number` })
    deduction_percentage: number;

    @ApiProperty({
        description: `The 'max_months' of advance salary`,
        example: 2
    })
    @IsOptional()
    @Type(() => Number)
    @IsNumber({}, { message: `'max_months' must be number` })
    max_months: number;

    @IsOptional()
    approved_by?: string;
}