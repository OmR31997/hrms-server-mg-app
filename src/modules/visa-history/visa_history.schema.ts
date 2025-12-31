import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Status } from "../visa/dto/create-visa.dto";

export type VisaHistoryDocument = VisaHistory & Document;

@Schema({ timestamps: { createdAt: "changed_at", updatedAt: false } })
export class VisaHistory {

    @Prop({ type: Types.ObjectId, ref: "Visa", required: [true, `'visa_id' must be reqired`] })
    visa_id: Types.ObjectId;

    @Prop({ enum: Object.values(Status), required: [true, `'old_status' must be reqired`] })
    old_status: Status;

    @Prop({ enum: Object.values(Status), required: [true, `'new_status' must be reqired`] })
    new_status: Status;

    @Prop({ type: Types.ObjectId, ref: "User", required: [true, `'changed_by' must be required`] })
    changed_by: Types.ObjectId;
}

export const VisaHistorySchema = SchemaFactory.createForClass(VisaHistory);

VisaHistorySchema.index({ visa_id: 1, changed_at: -1 })