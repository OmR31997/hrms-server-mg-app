import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Action } from "./dto/create-visa-quota-log.dto";

export type VisaQuotaLogDocument = VisaQuotaLog & Document;

@Schema({ timestamps: { createdAt: true, updatedAt: false } })
export class VisaQuotaLog {

    @Prop({ type: Types.ObjectId, ref: "Company", required: [true, `'company_id' must be reqired`] })
    company_id: Types.ObjectId;
    
    @Prop({ enum: Object.values(Action), required: [true, `'action' must be reqired`] })
    action: Action;
    
    @Prop({ type: Types.ObjectId, ref: "Employee", required: [true, `'employee_id' must be reqired`] })
    employee_id: Types.ObjectId;
}

export const VisaQuotaLogSchema = SchemaFactory.createForClass(VisaQuotaLog);

VisaQuotaLogSchema.index({ visa_id: 1, changed_at: -1 })