import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Status } from "./dto/create-employee.dto";
import objectIdPlugin from "@common/utils/objectId.plugin";

export type EmployeeDocument = Employee & Document;

@Schema({timestamps: {createdAt: 'joining_date'}})
export class Employee {

    @Prop({ type: Types.ObjectId, ref: "Company", required: [true, `'company_id' must be required`] })
    company_id: Types.ObjectId;

    @Prop({ type: Types.ObjectId, required: [true, `'branch_id' must be required`] })
    branch_id: Types.ObjectId;

    @Prop({ unique: true, required: [true, `'employee_code' must be required`] })
    employee_code: string;

    @Prop({ required: [true, `'full_name' must be required`] })
    full_name: string;

    @Prop({ required: [true, `'dob' must be required`] })
    dob: Date;

    @Prop({ required: [true, `'nationality' must be required`] })
    nationality: string;

    @Prop({ required: [true, `'gender' must be required`], enum: ["male", "female", "unknown"] })
    gender: string;

    @Prop({ type: Date, default: () => new Date() })
    joining_date: Date;

    @Prop({ default: Status.PENDING, enum: Object.values(Status) })
    employment_status: Status;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);

EmployeeSchema.plugin(objectIdPlugin);