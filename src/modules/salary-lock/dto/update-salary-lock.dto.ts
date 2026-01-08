import { PartialType } from "@nestjs/mapped-types";
import { CreateSalaryLockDto } from "./create-salary-lock.dto";

export class UpdateSalaryLockDto extends PartialType(CreateSalaryLockDto) {}