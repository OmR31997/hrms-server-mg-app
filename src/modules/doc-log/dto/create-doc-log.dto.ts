import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsMongoId, IsString } from "class-validator";

export class CreateDocLogDto {

    @ApiProperty({
        description: `The 'document_id' of the doc-log`,
        example: 'ObjectId',
    })
    @IsMongoId({ message: `'document_id' must be a valid MongoDB ObjectId` })
    document_id: string;

    @ApiProperty({
        description: `Action performed on the document`,
        example: 'created | updated | deleted',
    })
    @IsString({ message: `'action' must be a string` })
    @IsIn(['created', 'updated', 'deleted', 'approved'])
    action: string;

    @ApiProperty({
        description: `User who performed the action`,
        example: 'ObjectId',
    })
    @IsMongoId({ message: `'performed_by' must be a valid MongoDB ObjectId` })
    performed_by: string;
}