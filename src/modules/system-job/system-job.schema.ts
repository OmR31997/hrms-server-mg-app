import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

export type SystemJobDocument = SystemJob & Document;

@Schema({ timestamps: {createdAt: "last_run_at"} })
export class SystemJob {
    @Prop({ required: [true, `'job_name' must be required`] })
    job_name: string;

    @Prop({ required: [true, `'status' must be required`] })
    status: string;
}

export const SystemJobSchema = SchemaFactory.createForClass(SystemJob)