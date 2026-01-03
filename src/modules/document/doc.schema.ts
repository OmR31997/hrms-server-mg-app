import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { DocumentType } from "./dto/create-doc.dto";
import type { FilePath } from "@common/types/payload.type";

export type DocDocument = Doc & Document;

@Schema({ timestamps: true })
export class Doc {

    @Prop({ type: Types.ObjectId, ref: "Employee", required: [true, `'employee_id' must be required`] })
    employee_id: Types.ObjectId;

    @Prop({ enum: Object.values(DocumentType), required: [true, `'doc_type' must be required`] })
    doc_type: string;

    @Prop({type: Object, default: null})
    file_path: FilePath

    @Prop({ required: [true, `'version' must be required`] })
    version: number;

    @Prop({ default: false })
    is_verified: boolean;

    @Prop({ default: null })
    verified_by: string;
}

export const DocSchema = SchemaFactory.createForClass(Doc);