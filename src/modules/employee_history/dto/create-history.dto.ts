import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsString } from "class-validator";

export class CreateHistoryDto {

    @ApiProperty({
        description: `The 'employee_id' of the employee`,
        example: 'ObjectId',
    })
    @IsMongoId({ message: `'employee_id' must contain valid Mongo IDs` })
    employee_id: string;

    @ApiProperty({
        description: `The 'field_name' of the employee history`,
        example: 'job_title | salary etc',
    })
    @IsString({ message: `'field_name' must be string` })
    field_name: string;

    @ApiProperty({
        description: `The 'old_value' of the employee history`,
        example: 'junior',
    })
    @IsString({ message: `'old_value' must be string` })
    old_value: string;

    @ApiProperty({
        description: `The 'new_value' of the employee history`,
        example: 'senior',
    })
    @IsString({ message: `'new_value' must be string` })
    new_value: string;

    @ApiProperty({
        description: `The 'changed_by' of the employee history`,
        example: 'admin | manager | employee | user',
    })
    @IsString({ message: `'changed_by' must be string` })
    changed_by: string;
}