import { Types } from "mongoose";
import { VisaQuotaLog } from "../visa_quota_log.schema";

export interface IVisaQuotaLog extends Partial<VisaQuotaLog> {
    _id: Types.ObjectId;
}