import { PartialType } from "@nestjs/mapped-types";
import { CreateCompanyDto } from "./create-company.dto";

export class UpadateCompanyDto extends PartialType(CreateCompanyDto) {}