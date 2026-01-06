import { IsMongoId } from "class-validator";

export class KeyValDto {
  @IsMongoId({ message: "'_id' must be a valid MongoDB ObjectId" })
  _id: string;
}
