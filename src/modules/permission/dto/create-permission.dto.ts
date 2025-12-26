import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreatePermissionDto {

    @ApiProperty({
        description: `The 'resource' of the company`,
        example: 'branch'
    })
    @IsString({ message: `'resource' must be string` })
    resource: string;

    @ApiProperty({
        description: `The 'action' of the company`,
        example: 'create | read | update | delete'
    })
    @IsString({message: `'action' must be string`})
    action: string;

    @ApiProperty({
        description: `The 'scope' of the company`,
        example: 'self | global'
    })
    @IsString({message: `'scope' must be string`})
    scope: string;
}