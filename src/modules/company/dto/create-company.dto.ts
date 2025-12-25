import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsOptional, IsString } from "class-validator";

export class CreateCompanyDto {

    @ApiProperty({
        description: `The 'legal_name' of the company`,
        example: 'AJAY PVT.ltd',
    })
    @IsString({message: `'legal_name' must be string`})
    legal_name: string;

    @ApiProperty({
        description: `The 'trn' of the company`,
        example: 'TXN00000545',
    })
    @IsEmail({}, {message: `'company_id' must be string`})
    trn: string;

    @ApiProperty({
        description: `The 'registration_no' of the company`,
        example: '1323232423',
    })
    @IsString({message: `'registration_no' must be string`})
    registration_no: string;

    @ApiProperty({
        description: `The 'license_expiry' of the company`,
        example: 'YYYY/MM/DD',
    })
    @IsString({message: `'license_expiry' must be string`})
    license_expiry: Date;

    @ApiProperty({
        description: `The 'country' of the company`,
        example: 'USA',
    })
    @IsString({message: `'country' must be string`})
    country: string;

    @ApiProperty({
        description: `The 'employee_id' of the company`,
        example: 'AED/INR/USD',
    })
    @IsString({message: `'currency' must be string`})
    currency: string;

    @ApiProperty({
        description: `The 'visa_quota_total' of the company`,
        example: '100',
    })
    @IsString({message: `'visa_quota_total' must be string`})
    visa_quota_total: number;

    @ApiProperty({
        description: `The 'status' of the company`,
        example: 'approved',
    })
    @IsString({message: `'status' must be string`})
    status: string;
}