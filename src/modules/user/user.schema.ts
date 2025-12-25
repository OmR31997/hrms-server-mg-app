import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true })
    company_id: string;

    @Prop({ unique: true, required: true })
    email: string;

    @Prop({ required: true })
    phone: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true })
    role_id: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref:"Employee", unique: true })
    employee_id?: string;
    
    @Prop({ default: true })
    is_active: boolean;
    
    last_login_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);