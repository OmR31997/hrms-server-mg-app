import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

export type AdvanceDeductionDocument = AdvanceDeduction & Document;

@Schema({ timestamps: { createdAt: true } })
export class AdvanceDeduction {
    @Prop({ required: [true, `'advance_id' must be required`] })
    advance_id: Types.ObjectId;

    @Prop({ required: [true, `'salary_month' must be required`] })
    salary_month: string;

    @Prop({ required: [true, `'deducted_amount' must be required`] })
    deducted_amount: string;

    @Prop({ required: [true, `'remaining_balance' must be required`] })
    remaining_balance: string;
}

export const AdvanceDeductionSchema = SchemaFactory.createForClass(AdvanceDeduction);