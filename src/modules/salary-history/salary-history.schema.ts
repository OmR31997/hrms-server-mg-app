import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

export type AdminDocument = Admin & Document;

@Schema({ timestamps: true })
export class Admin {
    @Prop({ required: [true, `'salary_id' must be required`] })
    salary_id: Types.ObjectId;

    @Prop({ required: [true, `'field_name' must be required`], unique: true, lowercase: true, trim: true })
    field_name: string;

    @Prop({ required: [true, `'old_value' must be required`], select: false })
    old_value: string;

    @Prop({ required: [true, `'new_value' must be required`] })
    new_value: number;

    @Prop({ type: Types.ObjectId, ref: "Role", required: [true, `'changed_by' must be required`] })
    changed_by: Types.ObjectId;
}

export const AdminSchema = SchemaFactory.createForClass(Admin)