import { Types } from "mongoose";
import { AssignPermission } from "../assign_permission.schema";

export interface IAssignPermission extends Partial<AssignPermission> {
    _id: Types.ObjectId;
}