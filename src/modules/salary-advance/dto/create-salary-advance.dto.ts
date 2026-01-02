import { ApiProperty } from "@nestjs/swagger";
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
    @IsNumber({}, { message: `'requested_amount' must be number` })
    requested_amount: string;

    @ApiProperty({
        description: `The 'approved_amount' of the role`,
        example: 'employee'
    })
    @IsNumber({}, { message: `'approved_amount' must be number` })
    approved_amount: string;

    @ApiProperty({
        description: `The 'deduction_percentage' of the role`,
        example: 5
    })
    @IsNumber({}, { message: `'deduction_percentage' must be number` })
    deduction_percentage: string;

    @ApiProperty({
        description: `The 'max_months' of advance salary`,
        example: 2
    })
    @IsOptional()
    @IsNumber({}, { message: `'max_months' must be number` })
    max_months: string;
}