import { Types } from "mongoose"

export type CreateAuditLog = {
    entity: string,
    entity_id: Types.ObjectId,
    action: string,
    before_data: Object ,
    after_data: Object,
    ip_address: string,
    performed_by: string
}