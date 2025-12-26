import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsEmail, IsMongoId, IsOptional, IsString, Matches } from "class-validator";

export class CreateUserDto {

    @ApiProperty({
        description: `The 'company_id' of the user`,
        example: 'ObjectId',
    })
    @IsMongoId({message: `'company_id' must contain valid Mongo IDs`})
    company_id: string;

    @ApiProperty({
        description: `The 'email' of the user`,
        example: 'user@mail.com',
    })
    @IsEmail({}, {message: `'email' must be a valid email address`})
    email: string;

    @ApiProperty({
        description: `The 'phone' of the user`,
        example: '+91-9325478965',
    })
    @IsString({message: `'phone' must be string`})
    @Matches(/^\+([1-9]{1,4})?([-\s]?)\(?([0-9]{1,4})\)?[-\s]?([0-9]{1,15})$/, {
        message: `'phone' must be a valid international phone number (E.164 format)`
    })
    phone: string;

    @ApiProperty({
        description: `The 'role_id' of the user`,
        example: 'ObjectId',
    })
    @IsMongoId({message: `'role_id' must contain valid Mongo IDs`})
    role_id: string;

    @ApiProperty({
        description: `The 'employee_id' of the user`,
        example: 'ObjectId',
    })
    @IsOptional()
    @IsMongoId({message: `'employee_id' must contain valid Mongo IDs`})
    employee_id?: string;

    @ApiProperty({
        description: `The 'is_active' of the user`,
        example: true,
    })
    @IsOptional()
    @IsBoolean()
    is_active?: boolean;
}