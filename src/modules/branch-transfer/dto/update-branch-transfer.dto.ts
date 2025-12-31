import { PartialType } from "@nestjs/mapped-types";
import { CreateBranchTransferDto } from "./create-branch-transfer.dto";

export class UpdateBranchTransferDto extends PartialType(CreateBranchTransferDto) {}