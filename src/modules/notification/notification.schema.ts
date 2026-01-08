import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Channel } from "./types/create-notification.type";

export type NotificationDocument = Notification & Document;

@Schema({ timestamps: {createdAt: "sent_at"} })
export class Notification {
    @Prop({ type:Types.ObjectId, ref:"User", required: [true, `'salary_id' must be required`] })
    user_id: Types.ObjectId;

    @Prop({ required: [true, `'type' must be required`] })
    type: string;

    @Prop({ enum: Object.values(Channel), required: [true, `'channel' must be required`] })
    channel: Channel;

    @Prop({ required: [true, `'message' must be required`] })
    message: string;

    @Prop({ required: [true, `'status' must be required`] })
    status: string;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification)