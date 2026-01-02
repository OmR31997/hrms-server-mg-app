import type { IBankAccount } from "@module/bank-account/interfaces/bank-account.interface";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema, Types } from "mongoose";

export type BankAccountHistoryDocument = BankAccountHistory & Document;

@Schema({ timestamps: true })
export class BankAccountHistory {

    @Prop({ type: Types.ObjectId, ref: "BankAccount", unique:true, required: [true, `'bank_account_id' field must be required`] })
    bank_account_id: Types.ObjectId;

    @Prop({ required: [true, `'bank_name' field must be required`] })
    old_data: MongooseSchema.Types.Mixed;

    @Prop({ required: [true, `'account_no' field must be required`] })
    new_data: MongooseSchema.Types.Mixed;

    @Prop({ type: MongooseSchema.Types.Mixed, required: [true, `'changed_by' field must be required`] })
    changed_by: {
        id: Types.ObjectId,
        role: string
    }
}

export const BankAccountHistorySchema = SchemaFactory.createForClass(BankAccountHistory);