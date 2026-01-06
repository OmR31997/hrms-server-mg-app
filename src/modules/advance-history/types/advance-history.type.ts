import { Types } from "mongoose"

export enum Performer {
    REQUEST = "request",
    APPROVE = "approve",
    DEDUCT = "deduct",
    CLOSE = "close"
}

export type AdvanceHistory = {
    advance_id: Types.ObjectId,
    action: Performer;
    performed_by: Types.ObjectId
}