import { CreateEmployeeDto } from "./create-employee.dto";
import { PartialType } from "@nestjs/mapped-types";

export class UpdateEmpoyeeDto extends PartialType(CreateEmployeeDto) {}