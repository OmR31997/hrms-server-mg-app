import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Action } from "./types/create-doc-log.type";

export type DocLogDocument = DocLog & Document;

@Schema({ timestamps: true })
export class DocLog {

    @Prop({ type: Types.ObjectId, required: [true, `'document_id' must be required`] })
    document_id: Types.ObjectId;

    @Prop({ enum: Object.values(Action), required: [true, `'action' must be required`] })
    action: Action;

    @Prop({ type: Types.ObjectId, ref: "Role", required: [true, `'performed_by' must be required`] })
    performed_by: Types.ObjectId;
}

export const DocLogSchema = SchemaFactory.createForClass(DocLog);