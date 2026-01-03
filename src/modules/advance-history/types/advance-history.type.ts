import { Types } from "mongoose"

export type AdvanceHistory = {
    advance_id: Types.ObjectId,
    action: string;
    performed_by: Types.ObjectId
}