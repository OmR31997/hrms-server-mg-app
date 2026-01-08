import { Types } from "mongoose"

export enum Action {
    APPROVED = "approved",
    REJECTED = "rejected"
}
export type CreateLeaveHistory = {
    leave_id: Types.ObjectId;
    action: Action
}