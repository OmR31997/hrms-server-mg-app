import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsMongoId, IsNotEmpty} from "class-validator";
import { Status } from "src/modules/visa/dto/create-visa.dto";

export class CreateVisaHistoryDto {

    @IsMongoId({ message: `'visa_id' must contain valid Mongo IDs` })
    @IsNotEmpty()
    visa_id: string;

    @ApiProperty({
        description: `The 'old_status' of the visa`,
        enum: Status,
        enumName: "VisaStatus"
    })
    @IsEnum(Status)
    @IsNotEmpty()
    old_status: Status;

    @ApiProperty({
        description: `The 'new_status' of the visa`,
        enum: Status,
        enumName: "VisaStatus"
    })
    @IsEnum(Status)
    @IsNotEmpty()
    new_status: Status;

    @IsMongoId({ message: `'changed_by' must contain valid Mongo IDs` })
    @IsNotEmpty()
    changed_by: string;
}