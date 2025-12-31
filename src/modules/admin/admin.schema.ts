import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

export type AdminDocument = Admin & Document;

@Schema({ timestamps: true })
export class Admin {
    @Prop({ required: [true, `'name' must be required`] })
    name: string;

    @Prop({ required: [true, `'email' must be required`], unique: true, lowercase: true, trim: true })
    email: string;

    @Prop({ required: [true, `'password' must be required`], select: false })
    password: string;

    @Prop({ type: Types.ObjectId, ref: "Role", required: [true, `'role_id' must be required`] })
    role_id: Types.ObjectId;
}

export const AdminSchema = SchemaFactory.createForClass(Admin)