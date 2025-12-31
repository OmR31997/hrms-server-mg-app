import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsMongoId, IsNotEmpty } from "class-validator";

export enum Action { ASSIGN = "assign", RELEASE = "release", EXPIRE = "expire" }

export class CreateVisaQuotaLogDto {

    @IsMongoId({ message: `'company_id' must contain valid Mongo IDs` })
    @IsNotEmpty()
    company_id: string;

    @ApiProperty({
        description: `The 'action' of the visa`,
        example: Action.ASSIGN,
        enum: Action,
        enumName: "Action"
    })
    @IsEnum(Action)
    @IsNotEmpty()
    action: Action;

    @IsMongoId({ message: `'employee_id' must contain valid Mongo IDs` })
    @IsNotEmpty()
    employee_id: string;
}