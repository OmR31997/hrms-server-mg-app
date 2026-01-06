import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Status } from "./dto/create-visa.dto";
import objectIdPlugin from "@common/utils/objectId.plugin";

export type VisaDocument = Visa & Document;

@Schema({ timestamps: true })
export class Visa {

    @Prop({ type: Types.ObjectId, ref: "Employee", unique: true, required: [true, `'employee_id' must be required.`] })
    employee_id: Types.ObjectId;

    @Prop({ unique: true, required: [true, `'visa_number' must be required.`] })
    visa_number: string;

    @Prop({ required: [true, `'visa_type' must be required.`] })
    visa_type: string;

    @Prop({type: Date, required: [true, `'issue_date' must be required.`] })
    issue_date: Date;

    @Prop({type:Date, required: [true, `'expiry_date' must be required.`] })
    expiry_date: Date;

    @Prop({ required: [true, `'sponsor_company' must be required.`] })
    sponsor_company: string;

    @Prop({ type: Types.ObjectId, ref: "User", immutable:true, required: [true, `'assigned_manager_id' must be required.`] })
    assigned_manager_id: Types.ObjectId;

    @Prop({ enum: Object.values(Status), default: Status.ACTIVE})
    status: Status;
}

export const VisaSchema = SchemaFactory.createForClass(Visa);

VisaSchema.plugin(objectIdPlugin)
