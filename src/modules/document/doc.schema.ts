import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({ timestamps: true })
export class Doc {

    @Prop({ type: Types.ObjectId, ref: "Employee", required: [true, `'employee_id' must be required`] })
    employee_id: Types.ObjectId;

    @Prop({ required: [true, `'doc_type' must be required`] })
    doc_type: string;

    @Prop({ required: [true, `'file_path' must be rquired`] })
    file_path: string;

    @Prop({ required: [true, `'version' must be required`] })
    version: number;

    @Prop({ default: false })
    is_verified: boolean;

    @Prop({default: null})
    verified_by: string | null;
}

export const DocSchema = SchemaFactory.createForClass(Doc);