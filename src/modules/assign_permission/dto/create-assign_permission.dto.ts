import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsMongoId } from "class-validator";

export class CreateAssignPermissionDto {

    @ApiProperty({
        description: `The 'role_id' of the company`,
        example: "ObjectId"
    })
    @IsMongoId({ message: `'role_id' must be a valid MongoDB ObjectId` })
    role_id: string;

    @ApiProperty({
        description: `The 'role_id' of the company`,
        example: "ObjectId"
    })
    @IsMongoId({ each: true, message: `'permission_id' must contain valid Mongo IDs` })
    permission_id: string;
}