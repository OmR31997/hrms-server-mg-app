import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Performer } from "./types/advance-history.type";

export type AdvanceHistoryDocument = AdvanceHistory & Document;

@Schema({ timestamps: true })
export class AdvanceHistory {
    @Prop({ required: [true, `'advance_id' must be required`] })
    advance_id: Types.ObjectId;

    @Prop({ enum: Object.values(Performer), required: [true, `'action' must be required`] })
    action: Performer;

    @Prop({ type:Types.ObjectId, ref:"Role", required: [true, `'performed_by' must be required`] })
    performed_by: Types.ObjectId;
}

export const AdvanceHistorySchema = SchemaFactory.createForClass(AdvanceHistory);