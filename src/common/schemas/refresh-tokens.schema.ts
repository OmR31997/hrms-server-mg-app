import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

export type RefreshTokenDocument = RefreshToken & Document;

@Schema({timestamps: true})
export class RefreshToken {
    @Prop({ required: [true, `'owner_id' must be required`] })
    owner_id: Types.ObjectId;

    @Prop({enum:["User", "Admin"], required: [true, `'ref_by' must be required`]})
    ref_by: string;

    @Prop({required: [true, `'role_id' must be required`]})
    role_id: Types.ObjectId;

    @Prop({default: null})
    company_id?: Types.ObjectId;
    
    @Prop({required: [true, `'token_hash' must be required`]})
    token_hash: string;

    @Prop({type: Date, required: [true, `'expires_at' must be required`]})
    expires_at: Date;

    @Prop({type: Date, default: null})
    revoked_at: Date;

    @Prop()
    device_id?: string;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);