import { IsMongoId } from "class-validator";

export class KeyValDto {
  @IsMongoId({ message: "'reqId' must be a valid MongoDB ObjectId" })
  _id: string;
}
