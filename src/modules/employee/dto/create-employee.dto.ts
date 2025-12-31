import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsIn, IsMongoId, IsOptional, IsString } from "class-validator";

export class CreateEmployeeDto {

    @ApiProperty({
        description: `The 'company_id' of the employee`,
        example: 'ObjectId',
    })
    @IsMongoId({ message: `'company_id' must contain valid Mongo IDs` })
    company_id: string;

    @ApiProperty({
        description: `The 'branch_id' of the employee`,
        example: 'ObjectId',
    })
    @IsMongoId({ message: `'branch_id' must contain valid Mongo IDs` })
    branch_id: string;

    @ApiProperty({
        description: `The 'employee_code' of the employee`,
        example: '4454541',
    })
    @IsString({ message: `'employee_code' must be string` })
    employee_code: string;

    @ApiProperty({
        description: `The 'full_name' of the employee`,
        example: 'Arjun',
    })
    @IsString({ message: `'full_name' must be string` })
    full_name: string;

    @ApiProperty({
        description: `The 'dob' of the employee`,
        example: '2000-12-10',
    })
    @IsDateString({}, { message: `'dob' must be a valid date string` })
    dob: string;

    @ApiProperty({
        description: `The 'nationality' of the employee`,
        example: 'Indian',
    })
    @IsString({ message: `'nationality' must be string` })
    nationality: string;

    @ApiProperty({
        description: `The 'gender' of the employee`,
        example: 'male | female | unknown',
    })
    @IsIn(['male', 'female', 'unknown'], { message: `'gender' must be a valid value` })
    @IsString({ message: `'gender' must be string` })
    gender: string;

    @ApiProperty({
        description: `The 'joining_date' of the employee`,
        example: '2000-12-10',
    })
    @IsOptional()
    @IsDateString({}, { message: `'joining_date' must be string` })
    joining_date: string;

    @ApiProperty({
        description: `The 'employment_status' of the employee`,
        example: 'approved | pending | rejected | resigned | terminated',
    })
    @IsOptional()
    @IsString({ message: `'employment_status' must be string` })
    @IsIn(['approved', 'pending', 'rejected', 'resigned', 'terminated'], { message: `'employment_status' must be valid value` })
    employment_status: string;
}