import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDateString, IsIn, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCompanyDto {

    @ApiProperty({
        description: `The 'legal_name' of the company`,
        example: 'AJAY PVT.ltd',
    })
    @IsString({ message: `'legal_name' must be string` })
    legal_name: string;

    @ApiProperty({
        description: `The 'registration_no' of the company`,
        example: '1323232423',
    })
    @IsString({ message: `'registration_no' must be string` })
    registration_no: string;

    @ApiProperty({
        description: `The 'license_expiry' of the company`,
        example: 'YYYY-MM-DD',
    })
    @IsDateString({}, { message: `'license_expiry' must be a valid date string` })
    license_expiry: string;

    @ApiProperty({
        description: `The 'country' of the company`,
        example: 'USA',
    })
    @IsString({ message: `'country' must be string` })
    country: string;

    @ApiProperty({
        description: `The 'currency' of the company`,
        example: 'AED | INR | USD',
    })
    @IsString({ message: `'currency' must be string` })
    @IsIn(['INR', 'AED', 'USD'], { message: `'currency' must be one of INR, AED, USD` })
    currency: string;

    @ApiProperty({
        description: `The 'visa_quota_total' of the company`,
        example: '100',
    })
    @IsNumber({}, { message: `'visa_quota_total' must be number` })
    @Type(() => Number)
    visa_quota_total: number;

    @ApiProperty({
        description: `The 'created_by' of the company`,
        example: 'ObjectId',
    })
    @IsString({ message: `'created_by' must be string` })
    @IsOptional()
    created_by?: string;


    @ApiProperty({
        description: `The 'status' of the company`,
        example: 'approved | pending | rejected',
    })
    @IsOptional()
    @IsString({ message: `'status' must be string` })
    @IsIn(['approved', 'pending', 'rejected'], { message: `'employment_status' must be valid value` })
    status: string;
}