import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

export type SalaryAdvanceDocument = SalaryAdvance & Document;

@Schema({timestamps: true})
export class SalaryAdvance {
    @Prop({type: Types.ObjectId, ref: "Employee", required: [true, `'employee_id' must be required`]})
    employee_id: Types.ObjectId;
    
    @Prop({required: [true, `'requested_amount' must be required`]})
    requested_amount:number;

    @Prop({required: [true, `'approved_amount' must be required`]})
    approved_amount: number;

    @Prop({required: [true, `'deduction_percentage' must be required`]})
    deduction_percentage: number;

    @Prop({max: 2, required: [true, `'deduction_percentage' must be required`]})
    max_months: number;

    @Prop({type: Types.ObjectId, ref: "role", required: [true, `'approved_by' must be required`]})
    approved_by: Types.ObjectId

    status:string;
}

export const SalaryAdvanceSchema = SchemaFactory.createForClass(SalaryAdvance)