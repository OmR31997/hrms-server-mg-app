import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsString } from "class-validator";

export class CreateRoleDto{
    @ApiProperty({
        description: `The 'company_id' of the role`,
        example: 'ObjectId'
    })
    @IsMongoId({message: `'company_id' must contain valid Mongo IDs`})
    company_id: string;

    @ApiProperty({
        description: `The 'name' of the role`,
        example: 'employee'
    })
    @IsString({message: `'name' must be string`})
    name:string;
}