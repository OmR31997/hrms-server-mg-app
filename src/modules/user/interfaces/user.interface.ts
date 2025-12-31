import { Types } from "mongoose";
import { User } from "../user.schema";

export interface IUser extends Partial<User> {
    _id: Types.ObjectId;
}