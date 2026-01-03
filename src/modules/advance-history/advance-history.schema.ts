import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

export type AdvanceHistoryDocument = AdvanceHistory & Document;

@Schema({ timestamps: true })
export class AdvanceHistory {
    @Prop({ required: [true, `'advance_id' must be required`] })
    advance_id: Types.ObjectId;

    @Prop({ required: [true, `'action' must be required`] })
    action: string;

    @Prop({ required: [true, `'performed_by' must be required`] })
    performed_by: string;

    @Prop({ required: [true, `'remaining_balance' must be required`] })
    remaining_balance: string;
}

export const AdvanceHistorySchema = SchemaFactory.createForClass(AdvanceHistory);