import { Types } from "mongoose";
import { Admin } from "../admin.schema";

export interface IAdmin extends Pick<Admin, "password"> {
    _id?: Types.ObjectId,
    role_id?: Types.ObjectId
}