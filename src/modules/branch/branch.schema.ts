import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

export type BranchDocument = Branch & Document;

@Schema({ timestamps: true })
export class Branch {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true })
    company_id: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    code: string;

    @Prop({ required: true })
    address: string;

    @Prop({ required: true })
    lat: string;

    @Prop({ required: true })
    lng: string;

    @Prop({ type:mongoose.Schema.Types.ObjectId, ref: "User", required: true })
    manager_id: string;

    @Prop({ required: true })
    status: string;

}

export const BranchSchema = SchemaFactory.createForClass(Branch);