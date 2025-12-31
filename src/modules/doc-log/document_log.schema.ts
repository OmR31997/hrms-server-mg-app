import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({ timestamps: true })
export class DocLog {

    @Prop({ type: Types.ObjectId, required: [true, `'document_id' must be required`] })
    document_id: Types.ObjectId;

    @Prop({ required: [true, `'action' must be required`] })
    action: string;

    @Prop({ type: Types.ObjectId, required: [true, `'performed_by' must be required`] })
    performed_by: Types.ObjectId;
}

export const DocLogSchema = SchemaFactory.createForClass(DocLog);