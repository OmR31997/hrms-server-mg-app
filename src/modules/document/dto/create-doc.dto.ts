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
        example: 'ObjectId',
    })
    @IsEnum(DocumentType)
    @IsNotEmpty()
    doc_type: DocumentType;

    @ApiProperty({
        type: 'string',
        format: 'binary',
        description: 'Upload the document file',
    })
    @IsOptional()
    file: any;

    @ApiProperty({
        description: `Document version`,
        example: 1,
    })
    @IsOptional()
    @Type(() => Number)
    @IsNumber({}, { message: `'version' must be a number` })
    version?: number;
}