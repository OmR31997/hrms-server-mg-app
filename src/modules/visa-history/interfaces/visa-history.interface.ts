import { Types } from "mongoose";
import { VisaHistory } from "../visa_history.schema";

export interface IVisaHistory extends VisaHistory {
    _id: Types.ObjectId;
}