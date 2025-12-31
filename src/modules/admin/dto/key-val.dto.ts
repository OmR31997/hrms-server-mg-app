// dto/key-val.dto.ts
import { IsEmail, IsMongoId, IsOptional } from "class-validator";

export class KeyValDto {
  @IsMongoId({ message: "'_id' must be a valid MongoDB ObjectId" })
  @IsOptional()
  _id?: string;

  @IsEmail({}, { message: "'email' must be a valid email address" })
  @IsOptional()
  email?: string;
}
