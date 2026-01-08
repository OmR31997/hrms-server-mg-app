import objectIdPlugin from "@common/utils/objectId.plugin";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

export type LeaveHistoryDocument = LeaveHistory & Document;

@Schema({ timestamps: true })
export class LeaveHistory {

    @Prop({ type: Types.ObjectId, ref: "Leave", required: [true, `'leave_id' must be required`] })
    leave_id: Types.ObjectId;

    @Prop({ required: [true, `'action' must be required`] })
    action: string;

    @Prop({ required: [true, `'performed_by' must be required`] })
    performed_by: Types.ObjectId;
}

export const LeaveHistorySchema = SchemaFactory.createForClass(LeaveHistory);

LeaveHistorySchema.plugin(objectIdPlugin);