import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {

    @Prop({ type: Types.ObjectId, ref: "Company", required: [true, `'company_id' field must be required`] })
    company_id: Types.ObjectId;

    @Prop({ unique: true, required: [true, `'email' field must be required`] })
    email: string;

    @Prop({ required: [true, `'phone' field must be required`] })
    phone: string;

    @Prop({ type: Types.ObjectId, ref: "Role", required: [true, `'role_id' field must be required`] })
    role_id: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: "Employee", default: null })
    employee_id?: Types.ObjectId;

    @Prop({ type: Date, default: null })
    last_login_at: Date;

    @Prop({ default: true })
    is_active: boolean;

}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index(
    { employee_id: 1 },
    { unique: true, partialFilterExpression: { employee_id: { $type: "objectId" }}}
)