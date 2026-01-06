import { Types } from "mongoose"

export enum Action {
    UPLOAD = "upload",
    UPDATE = "update",
    VERIFY = "verify"
}

export type CreateDocLog = {
    document_id: Types.ObjectId,
    action: Action,
    performed_by: Types.ObjectId
}