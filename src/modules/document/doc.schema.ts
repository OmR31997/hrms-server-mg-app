import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { DocumentType } from "./dto/create-doc.dto";

export type DocDocument = Doc & Document;

@Schema({ timestamps: true })
export class Doc {

    @Prop({ type: Types.ObjectId, ref: "Employee", required: [true, `'employee_id' must be required`] })
    employee_id: Types.ObjectId;

    @Prop({ enum: Object.values(DocumentType), required: [true, `'doc_type' must be required`] })
    doc_type: string;

    @Prop({ required: [true, `'version' must be required`] })
    version: number;

    @Prop({ default: false })
    is_verified: boolean;

    @Prop({ default: null })
    verified_by: string | null;
}

export const DocSchema = SchemaFactory.createForClass(Doc);