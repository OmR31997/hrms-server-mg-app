import { Types } from "mongoose";
import { BranchTransfer } from "../branch-transfer.schema";

export interface IBranchTransfer extends Partial<BranchTransfer> {
    _id: Types.ObjectId;
}