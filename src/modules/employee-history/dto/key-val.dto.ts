import { IsOptional, IsMongoId, IsEmail } from "class-validator";

export class KeyValDto {
  @IsOptional()
  @IsMongoId({ message: "'_id' must be a valid MongoDB ObjectId" })
  _id?: string;

  @IsOptional()
  @IsMongoId({ message: "'employee_id' must be a valid MongoDB ObjectId" })
  employee_id?: string;
}
