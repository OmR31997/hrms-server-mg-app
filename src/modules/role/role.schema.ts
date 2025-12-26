import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type RoleDocument = Role & Document;

@Schema({ timestamps: true })
export class Role {

    @Prop({ type: Types.ObjectId, ref: "Company", required: [true, `'company_id' field must be required`] })
    company_id: Types.ObjectId;

    @Prop({ required: [true, `'name' field must be required`], enum: ["manager", "employee", "user", "admin", "other"] })
    name: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);

// Ensure role name is unique per company
RoleSchema.index({ company_id: 1, name: 1 }, { unique: true });