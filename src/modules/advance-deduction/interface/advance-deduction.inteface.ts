import { Types } from "mongoose";
import { AdvanceDeduction } from "../advance-deduction.schema";

export interface IAdvanceDeduction extends AdvanceDeduction {
    _id: Types.ObjectId;
}