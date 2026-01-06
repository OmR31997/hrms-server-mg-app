import { IsMongoId, IsOptional } from "class-validator";

export class KeyValDto {
    @IsMongoId({ message: "'_id' must be a valid MongoDB ObjectId" })
    @IsOptional()
    _id?: string;
}