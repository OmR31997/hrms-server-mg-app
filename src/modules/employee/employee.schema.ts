import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

export type EmployeeDocument = Employee & Document;

@Schema({timestamps: true})
export class Employee {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true })
    company_id: string;

    @Prop({ required: true })
    branch_id: string;

    @Prop({ required: true })
    employee_code: string;

    @Prop({ required: true })
    full_name: string;

    @Prop({ required: true })
    dob: Date;

    @Prop({ required: true })
    nationality: string;

    @Prop({ required: true })
    gender: Date;

    @Prop({ required: true })
    employment_status: string;

}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);