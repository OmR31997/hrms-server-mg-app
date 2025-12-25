import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

export type RolePermissionDocument = RolePermission & Document;

@Schema({timestamps: true})
export class RolePermission {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true })
    role_id: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    permission_id: string;

}

export const RolePermissionSchema = SchemaFactory.createForClass(RolePermission);