import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsEmail, IsOptional, IsString, Matches } from "class-validator";

export class CreateUserDto {

    @ApiProperty({
        description: `The 'company_id' of the user`,
        example: 'ObjectId',
    })
    @IsString({message: `'company_id' must be string`})
    company_id: string;

    @ApiProperty({
        description: `The 'email' of the user`,
        example: '@mail.com',
    })
    @IsEmail({}, {message: `'company_id' must be string`})
    email: string;

    @ApiProperty({
        description: `The 'phone' of the user`,
        example: '+91-9325478965',
    })
    @IsString({message: `'phone' must be number`})
    @Matches(/^\+([1-9]{1,4})?([-\s]?)\(?([0-9]{1,4})\)?[-\s]?([0-9]{1,15})$/, {
        message: `'phone' must be a valid international phone number (E.164 format)`
    })
    phone: string;

    @ApiProperty({
        description: `The 'role_id' of the user`,
        example: 'ObjectId',
    })
    @IsString({message: `'role_id' must be string`})
    role_id: string;

    @ApiProperty({
        description: `The 'employee_id' of the user`,
        example: 'ObjectId',
    })
    @IsString({message: `'employee_id' must be string`})
    @IsOptional()
    employee_id?: string;

    @ApiProperty({
        description: `The 'is_active' of the user`,
        example: true,
    })
    @IsBoolean()
    @IsOptional()
    is_active?: boolean;

    @IsDate()
    @IsOptional()
    last_login_at?:Date
}