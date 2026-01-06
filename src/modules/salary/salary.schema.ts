import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { PaymentMode, Status } from "./dto/create-salary.dto";

export type SalaryDocument = Salary & Document;

@Schema({ timestamps: true })
export class Salary {
    @Prop({ required: [true, `'employee_id' must be required`] })
    employee_id: Types.ObjectId;

    @Prop({ required: [true, `'salary_month' must be required`], unique: true, lowercase: true, trim: true })
    salary_month: number;

    @Prop({ required: [true, `'gross_salary' must be required`], select: false })
    gross_salary: number;

    @Prop({ required: [true, `'role_id' must be required`] })
    net_salary: number;

    @Prop({ required: [true, `'advance_deduction' must be required`] })
    advance_deduction: number;

    @Prop({ enum: Object.values(PaymentMode), required: [true, `'payment_mode' must be required`] })
    payment_mode: PaymentMode;

    @Prop({ type: Types.ObjectId, ref: "BankAccount", required: [true, `'bank_account_id' must be required`] })
    bank_account_id: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: "SalaryLoc", required: [true, `'lot_id' must be required`] })
    lot_id: Types.ObjectId;

    @Prop({ enum: Object.values(Status), required: [true, `'status' must be required`] })
    status: Status;

    @Prop({ required: [true, `'is_locked' must be required`] })
    is_locked: boolean;
}

export const SalarySchema = SchemaFactory.createForClass(Salary)