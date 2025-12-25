import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

export type RoleDocument = Role & Document;

@Schema({timestamps: true})
export class Role {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true })
    company_id: string;

    @Prop({ required: true })
    name: string;

}

export const RoleSchema = SchemaFactory.createForClass(Role);