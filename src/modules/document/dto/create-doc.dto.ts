import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsMongoId, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateDocDto {
    @ApiProperty({
        description: `Employee ID to whom this document belongs`,
        example: 'ObjectId',
    })
    @IsMongoId({ message: `'employee_id' must contain valid Mongo IDs` })
    employee_id: string;

    @ApiProperty({
        description: `Type of document`,
        example: 'ObjectId',
    })
    @IsString({ message: `'doc_type' must be a string` })
    doc_type: string;

    @ApiProperty({
        description: `Stored file path or URL`,
        example: '/uploads/documents/passport.pdf',
    })
    @IsString({ message: `'file_path' must be a string` })
    file_path: string;

    @ApiProperty({
        description: `Document version`,
        example: 1,
    })
    @IsOptional()
    @Type(() => Number)
    @IsNumber({}, { message: `'version' must be a number` })
    version?: number;
}