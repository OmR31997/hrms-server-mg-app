import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type BankAccountDocument = BankAccount & Document;

@Schema({ timestamps: true })
export class BankAccount {

    @Prop({ type: Types.ObjectId, ref: "Company", required: [true, `'employee_id' field must be required`] })
    employee_id: Types.ObjectId;

    @Prop({ required: [true, `'bank_name' field must be required`] })
    bank_name: string;

    @Prop({ required: [true, `'account_no' field must be required`] })
    account_no: string;

    @Prop({ required: [true, `'ifsc' field must be required`] })
    ifsc: string;

    @Prop({ type: Date })
    effective_from: Date;

    @Prop({ type: Date })
    effective_to: Date;

    @Prop({ default: true })
    is_default: boolean;

    @Prop({ default: "pending", enum: ["approved", "pending", "rejected"] })
    verification_status: string;
}

export const BankAccountSchema = SchemaFactory.createForClass(BankAccount);

BankAccountSchema.index(
    { employee_id: 1, account_no: 1 }, { unique: true }
)