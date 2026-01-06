import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Status } from "./dto/create-branch.dto";

export type BranchDocument = Branch & Document;

@Schema({ timestamps: true })
export class Branch {

    @Prop({ type: Types.ObjectId, ref: "Company", required: [true, `'company_id' field must be required`] })
    company_id: Types.ObjectId;

    @Prop({ required: [true, `'name' field must be required`] })
    name: string;

    @Prop({ unique: true, required: [true, `'code' field must be required`] })
    code: string;

    @Prop({ required: [true, `'address' field must be required`] })
    address: string;

    @Prop({ required: [true, `'lat' field must be required`], min: -90, max: 90 })
    lat: number;

    @Prop({ required: [true, `'lng' field must be required`], min: -180, max: 180 })
    lng: number;

    @Prop({ type: Types.ObjectId, ref: "User", unique: true, required: [true, `'manager_id' field must be required`] })
    manager_id: Types.ObjectId;

    @Prop({ enum: Object.values(Status), default: Status.PENDING })
    status: Status;

}

export const BranchSchema = SchemaFactory.createForClass(Branch);