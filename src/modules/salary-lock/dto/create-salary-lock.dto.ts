import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateSalaryLockDto {
  @ApiProperty({
    description: "Salary ID that is being locked",
    example: "ObjectId",
  })
  @IsMongoId({ message: `'salary_id' must be a valid MongoDB ObjectId` })
  @IsNotEmpty()
  salary_id: string;

  @ApiProperty({
    description: "User ID who locked the salary",
    example: "ObjectId",
  })
  @IsMongoId({ message: `'locked_by' must be a valid MongoDB ObjectId` })
  @IsNotEmpty()
  locked_by: string;

  @ApiProperty({
    description: "Reason for unlocking the salary",
    example: "Salary correction approved by finance",
  })
  @IsString()
  @IsNotEmpty()
  unlock_reason: string;

  @ApiProperty({
    description: "Role or user ID who unlocked the salary",
    example: "ObjectId",
  })
  @IsMongoId({ message: `'unlocked_by' must be a valid MongoDB ObjectId` })
  @IsNotEmpty()
  unlocked_by: string;
}
