import { CreateSalaryLotDto } from "./create-salary-lot.dto";
import { PartialType } from "@nestjs/mapped-types"
export class UpdateSalaryLotDto extends PartialType(CreateSalaryLotDto) {}