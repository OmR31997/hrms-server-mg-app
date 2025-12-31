import { PartialType } from "@nestjs/mapped-types";
import { CreateVisaHistoryDto } from "./create-visa-history.dto";

export class UpdateVisaHistoryDto extends PartialType(CreateVisaHistoryDto) {}