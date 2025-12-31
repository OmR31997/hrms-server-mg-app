import { PartialType } from "@nestjs/mapped-types";
import { CreateDocLogDto } from "./create-doc-log.dto";

export class UpdateDocLogDto extends PartialType(CreateDocLogDto) {} 