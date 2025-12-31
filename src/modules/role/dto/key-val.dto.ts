// dto/key-val.dto.ts
import { IsMongoId, IsOptional, IsString } from "class-validator";

export class KeyValDto {

  @IsOptional()
  @IsMongoId({ message: "'_id' must be a valid MongoDB ObjectId" })
  _id?: string;

  @IsOptional()
  @IsString()
  name?: string;
}
