import { Types } from "mongoose";
import { Permission } from "../permission.schema";

export interface IPermission extends Partial<Permission> {
    _id: Types.ObjectId;
}