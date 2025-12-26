// dto/key-val.dto.ts
import { IsOptional, IsMongoId } from "class-validator";

export class KeyValDto {
  @IsOptional()
  @IsMongoId({ message: "'_id' must be a valid MongoDB ObjectId" })
  _id?: string;

  @IsOptional()
  @IsMongoId({ message: "'role_id' must be a valid MongoDB ObjectId" })
  role_id?: string;
}
