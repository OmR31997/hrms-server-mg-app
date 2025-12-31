import { Types } from "mongoose";
import { Branch } from "../branch.schema";

export interface IBranch extends Partial<Branch> {
    _id: Types.ObjectId;
}