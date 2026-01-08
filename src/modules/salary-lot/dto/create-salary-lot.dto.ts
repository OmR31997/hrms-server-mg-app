import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSalaryLotDto {
    @ApiProperty({
        description: 'Company ID',
        example: 'ObjectId',
    })
    @IsMongoId()
    @IsNotEmpty()
    company_id: string;

    @ApiProperty({
        description: 'Lot size (must be unique)',
        example: 'lot-a',
    })
    @IsString()
    @IsNotEmpty()
    lot_size: string;

    @ApiProperty({
        description: 'Total salary amount for this lot',
        example: 150000,
    })
    @Type(() => Number)
    @IsNumber()
    @IsNotEmpty()
    total_amount: number;

    @ApiProperty({
        description: 'User ID who created this lot',
        example: 'ObjectId',
    })
    @IsMongoId()
    @IsNotEmpty()
    created_by: string;
}
