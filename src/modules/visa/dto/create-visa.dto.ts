import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";

export enum Status { ACTIVE = "active", EXPIRED = "expired", CANCELLED = "cancelled", PENDING = "pending" };

export class CreateVisaDto {
    @ApiProperty({
        description: `The 'employee_id' of the company`,
        example: 'ObjectId',
    })
    @IsMongoId({message: `'employee_id' must contain valid Mongo IDs`})
    @IsNotEmpty()
    employee_id: string;

    @ApiProperty({
        description: `The 'visa_number' of the employee`,
        example: 'XXXXXX0000001',
    })
    @IsString()
    @IsNotEmpty()
    visa_number: string;

    @ApiProperty({
        description: `The 'visa_type' of the visa`,
        example: 'ABC',
    })
    @IsString()
    @IsNotEmpty()
    visa_type: string;

    @ApiProperty({
        description: `The 'issue_date' of the visa`,
        example: '2024-12-27',
    })
    @IsDateString()
    @IsNotEmpty()
    issue_date: string;

    @ApiProperty({
        description: `The 'expiry_date' of the visa`,
        example: '2029-12-27',
    })
    @IsDateString()
    @IsNotEmpty()
    expiry_date: string;

    @ApiProperty({
        description: `The 'sponsor_company' of the visa`,
        example: 'VMWare',
    })
    @IsString()
    @IsNotEmpty()
    sponsor_company: string;

    @ApiProperty({
        description: `The 'assigned_manager_id' of the visa`,
        example: 'ObjecrId',
    })
    @IsMongoId({message: `'assigned_manager_id' must contain valid Mongo IDs`})
    @IsNotEmpty()
    assigned_manager_id: string;

    @ApiProperty({
        description: `The 'status' of the visa`,
        example: Status.ACTIVE,
        enum: Status,
        enumName: "VisaStatus"
    })
    @IsOptional()
    @IsEnum(Status)
    status?: Status;
}