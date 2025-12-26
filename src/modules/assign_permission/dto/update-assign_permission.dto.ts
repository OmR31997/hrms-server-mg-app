import { PartialType } from "@nestjs/mapped-types";
import { CreateAssignPermissionDto } from "./create-assign_permission.dto";

export class UpadateAssignPermissionsDto extends PartialType(CreateAssignPermissionDto) {}