import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsIn, IsMongoId, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

export enum Status {
    APPROVED = "approved",
    PENDING = "pending",
    REJECTED = "rejected"
}

export class CreateBranchDto {

    @ApiProperty({
        description: `The 'company_id' of the branch`,
        example: 'ObjectId',
    })
    @IsMongoId({ message: `'company_id' must contain valid Mongo IDs` })
    company_id: string;

    @ApiProperty({
        description: `The 'name' of the branch`,
        example: 'Amar',
    })
    @IsString({ message: `'name' must be string` })
    name: string;

    @ApiProperty({
        description: `The 'code' of the branch`,
        example: '50001',
    })
    @IsString({ message: `'code' must be string` })
    code: string;

    @ApiProperty({
        description: `The 'address' of the branch`,
        example: 'B.NO.123, PLAZA, XYZ',
    })
    @IsString({ message: `'address' must be string` })
    address: string;

    @ApiProperty({
        description: `The 'lat' of the branch`,
        example: 28.613939,
    })
    @Type(() => Number)
    @IsNumber({}, { message: `'lat' must be a number` })
    @Min(-90, { message: `'lat' must be >= -90` })
    @Max(90, { message: `'lat' must be <= 90` })
    lat: number;

    @ApiProperty({
        description: `The 'lng' of the branch`,
        example: 77.209021,
    })
    @Type(() => Number)
    @IsNumber({}, { message: `'lng' must be a number` })
    @Min(-180, { message: `'lng' must be >= -180` })
    @Max(180, { message: `'lng' must be <= 180` })
    lng: number;

    @ApiProperty({
        description: `The 'manager_id' of the branch`,
        example: 'ObjectId',
    })
    @IsMongoId({ message: `'manager_id' must contain valid Mongo IDs` })
    manager_id: string;

    @ApiProperty({
        description: `The 'status' of the branch`,
        example: 'approved | pending | rejected',
    })
    @IsOptional()
    @IsString({ message: `'status' must be string` })
    @IsEnum(Status)
    status?: Status;
}