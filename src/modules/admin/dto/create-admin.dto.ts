import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsMongoId, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";
import { Types } from "mongoose";

export class CreateAdminDto{
    @ApiProperty({
        description: `The 'company_id' of the role`,
        example: 'ObjectId'
    })
    @IsNotEmpty()
    @IsMongoId({message: `'company_id' must contain valid Mongo IDs`})
    company_id: Types.ObjectId;

    @ApiProperty({
        description: `The 'company_id' of the role`,
        example: 'Amar'
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        description: `The 'name' of the role`,
        example: 'admin@gmail.com'
    })
    @IsEmail({}, {message: `'email' must be valid email address`})
    @IsNotEmpty()
    email:string;

    @ApiProperty({
        description: `The 'password' of the role`,
        example: '********'
    })
    @IsStrongPassword()
    @IsNotEmpty()
    password:string;
}