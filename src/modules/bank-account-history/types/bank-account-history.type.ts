import { Schema as MongooseSchema, Types } from "mongoose";

export type CreateBankHistory = {
    bank_account_id: Types.ObjectId;
    old_data: MongooseSchema.Types.Mixed,
    new_data: MongooseSchema.Types.Mixed,
    changed_by: {
        id: Types.ObjectId,
        role: string
    }
}