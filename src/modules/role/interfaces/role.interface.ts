import { Types } from "mongoose";
import { Role } from "../role.schema";

export interface IRole extends Partial<Role> {
    _id: Types.ObjectId;
}