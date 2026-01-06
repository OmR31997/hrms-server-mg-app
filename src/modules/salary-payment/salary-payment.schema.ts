import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

export type SalaryPaymentDocument = SalaryPayment & Document;

@Schema({ timestamps: {createdAt: "paid_at"} })
export class SalaryPayment {
    @Prop({ type:Types.ObjectId, ref:"Salary", required: [true, `'salary_id' must be required`] })
    salary_id: Types.ObjectId;

    @Prop({ required: [true, `'payment_mode' must be required`] })
    payment_mode: string;

    @Prop({ required: [true, `'amount' must be required`] })
    amount: number;

    @Prop({ required: [true, `'transaction_ref' must be required`] })
    transaction_ref: string;
}

export const SalaryPaymentSchema = SchemaFactory.createForClass(SalaryPayment)