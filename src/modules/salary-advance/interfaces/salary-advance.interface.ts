import { Types } from "mongoose";
import { SalaryAdvance } from "../salary-advance.schema";

export interface ISalaryAdvance extends Partial<SalaryAdvance> {
    _id: Types.ObjectId;
}