import { PartialType } from "@nestjs/mapped-types";
import { CreateEmployeeHistoryDto } from "./create-employee-history.dto";

export class UpdateHistoryDto extends PartialType(CreateEmployeeHistoryDto) { }