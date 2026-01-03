import { Types } from "mongoose";
import { AdvanceHistory } from "../types/advance-history.type";

export interface IAdvanceHistory extends AdvanceHistory {
    _id: Types.ObjectId;
}