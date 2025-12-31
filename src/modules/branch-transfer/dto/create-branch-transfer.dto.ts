import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";

export enum Status {
    UNDER_PROCESS = "under_process",
    APPROVED = "approved"
}

export class CreateBranchTransferDto {

    @ApiProperty({
        description: `The 'employee_id' of the role`,
        example: 'ObjectId'
    })
    @IsMongoId()
    @IsNotEmpty()
    employee_id: string;

    @ApiProperty({
        description: `The 'from_branch_id' of the role`,
        example: 'ObjectId'
    })
    @IsMongoId()
    @IsNotEmpty()
    from_branch_id: string;

    @ApiProperty({
        description: `The 'to_branch_id' of the role`,
        example: 'ObjectId'
    })
    @IsMongoId()
    @IsNotEmpty()
    to_branch_id: string;

    @ApiProperty({
        description: `The 'requested_by' of the role`,
        example: 'ObjectId'
    })
    @IsMongoId()
    @IsNotEmpty()
    requested_by?: string;

    @ApiProperty({
        description: `The 'approved_by' of the role`,
        example: 'ObjectId'
    })
    @IsMongoId()
    @IsNotEmpty()
    approved_by: string;

    @IsDateString()
    @IsOptional()
    effective_date?: string;

    @ApiProperty({
        description: `The 'status' of the role`,
        example: 'under_process | approved'
    })
    @IsOptional()
    @IsEnum(Status)
    status?: Status;
}