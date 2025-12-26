import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsMongoId } from "class-validator";

export class CreateAssignPermissionDto {

    @ApiProperty({
        description: `The 'role_id' of the company`,
        example: 'ObjectId'
    })
    @IsMongoId({ message: `'role_id' must be a valid MongoDB ObjectId` })
    role_id: string;

    @ApiProperty({
        description: `The 'role_id' of the company`,
        example: ["ObjectId"]
    })
    @IsArray({ message: `'permission_ids' must be an array` })
    @IsMongoId({ each: true, message: `'permission_ids' must contain valid Mongo IDs` })
    permission_ids: string[];
}