import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type OtpDocument = Otp & Document;

@Schema({ timestamps: { createdAt: "generated_at", updatedAt: false } })
export class Otp {
    @Prop({ required: [true, `'user_id' must be required`], index: true })
    userId: string;

    @Prop({ required: [true, `'otp_hash' must be required`] })
    otpHash: string;

    @Prop({
        required: [true, `'expires_at' must be required`],
        index: { expireAfterSeconds: 0 }    //TTL (Time-To-Leave) index
    })
    expiresAt: Date;

    @Prop({ default: false })
    used: boolean;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);