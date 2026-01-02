// dto/key-val.dto.ts
import { IsMongoId, IsOptional } from "class-validator";

export class KeyValDto {
  @IsMongoId({ message: "'_id' must be a valid MongoDB ObjectId" })
  @IsOptional()
  _id?: string;
  
  @IsMongoId({ message: "'employee_id' must be a valid MongoDB ObjectId" })
  @IsOptional()
  employee_id?: string;

  @IsMongoId({ message: "'account_no' must be a valid MongoDB ObjectId" })
  @IsOptional()
  account_no?: string;
}
