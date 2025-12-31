import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsMongoId, IsNotEmpty, IsOptional, IsString, Matches } from "class-validator";

export class CreateUserDto {

    @ApiProperty({
        description: `The 'company_id' of the user`,
        example: 'ObjectId',
    })
    @IsMongoId({message: `'company_id' must contain valid Mongo IDs`})
    @IsNotEmpty()
    company_id: string;

    @ApiProperty({
        description: `The 'email' of the user`,
        example: 'user@mail.com',
    })
    @IsEmail({}, {message: `'email' must be a valid email address`})
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: `The 'phone' of the user`,
        example: '+91-9325478965',
    })
    @Matches(/^\+([1-9]{1,4})?([-\s]?)\(?([0-9]{1,4})\)?[-\s]?([0-9]{1,15})$/, {
        message: `'phone' must be a valid international phone number (E.164 format)`
    })
    @IsString({message: `'phone' must be string`})
    @IsNotEmpty()
    phone: string;

    @ApiProperty({
        description: `The 'role_id' of the user`,
        example: 'ObjectId',
    })
    @IsMongoId({message: `'role_id' must contain valid Mongo IDs`})
    @IsNotEmpty()
    role_id: string;

    @ApiProperty({
        description: `The 'employee_id' of the user`,
        example: 'ObjectId',
    })
    @IsMongoId({message: `'employee_id' must contain valid Mongo IDs`})
    @IsOptional()
    employee_id?: string;

    @ApiProperty({
        description: `The 'is_active' of the user`,
        example: true,
    })
    @IsOptional()
    @IsBoolean()
    is_active?: boolean;
}