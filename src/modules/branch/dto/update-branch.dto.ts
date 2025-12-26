import { PartialType } from "@nestjs/mapped-types";
import { CreateBranchDto } from "./create-branch.dto";

export class UpadateBranchDto extends PartialType(CreateBranchDto) {}