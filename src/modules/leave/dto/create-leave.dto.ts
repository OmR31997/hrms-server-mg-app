import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class CreateLeaveDto {

  @ApiProperty({
    description: "Employee ObjectId",
    example: "64f1b2c9e4b0a12f3c9d4567",
  })
  @IsMongoId({ message: "'employee_id' must be a valid ObjectId" })
  @IsNotEmpty({ message: "'employee_id' must be required" })
  employee_id: string;

  @ApiProperty({
    description: "Type of leave",
    example: "Sick Leave",
  })
  @IsString({ message: "'leave_type' must be a string" })
  @IsNotEmpty({ message: "'leave_type' must be required" })
  leave_type: string;

  @ApiProperty({
    description: "Leave start date",
    example: "2026-01-01",
  })
  @IsString({ message: "'from_date' must be a string" })
  @IsNotEmpty({ message: "'from_date' must be required" })
  from_date: string;

  @ApiProperty({
    description: "Leave end date",
    example: "2026-01-05",
  })
  @IsString({ message: "'to_date' must be a string" })
  @IsNotEmpty({ message: "'to_date' must be required" })
  to_date: string;

  @ApiProperty({
    description: "Leave status",
    example: "Pending",
  })
  @IsString({ message: "'status' must be a string" })
  @IsNotEmpty({ message: "'status' must be required" })
  status: string;

  @ApiProperty({
    description: "Approver ObjectId",
    example: "64f1b2c9e4b0a12f3c9d9999",
  })
  @IsMongoId({ message: "'approved_by' must be a valid ObjectId" })
  @IsNotEmpty({ message: "'approved_by' must be required" })
  approved_by: string;
}
