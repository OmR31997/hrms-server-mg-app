import type { FilePath } from "@common/types/payload.type";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export enum DocumentType {
    PASSPORT = "passport",
    VISA = "visa",
    CONTRACT = "contract"
}

export class CreateDocDto {
    @ApiProperty({
        description: `Employee ID to whom this document belongs`,
        example: 'ObjectId',
    })
    @IsMongoId({ message: `'employee_id' must contain valid Mongo IDs` })
    @IsNotEmpty()
    employee_id: string;

    @ApiProperty({
        description: `Type of document`,
        example: 'passport | aadhar',
    })
    @IsEnum(DocumentType)
    @IsNotEmpty()
    doc_type: DocumentType;
    
    @ApiProperty({
        description: `Document version`,
        example: 1,
    })
    @IsOptional()
    @Type(() => Number)
    @IsNumber({}, { message: `'version' must be a number` })
    version?: number;

    @IsOptional()
    file_path?:FilePath;
}