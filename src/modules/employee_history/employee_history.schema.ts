import { Prop, Schema } from "@nestjs/mongoose";
import { Types } from "mongoose";
export type EmployeeHistoryDocument = EmployeeHistory & Document;

@Schema({ timestamps: { createdAt: 'changed_at', updatedAt: false } })
export class EmployeeHistory {

    @Prop({ type: Types.ObjectId, ref: "Employee", required: [true, `'employee_id' must be required`] })
    employee_id: Types.ObjectId;

    @Prop({ required: [true, `'field_name' must be required`] })
    field_name: string;

    @Prop({ required: [true, `'old_value' must be required`] })
    old_value: string;

    @Prop({ required: [true, `'new_value' must be required`] })
    new_value: string;

    @Prop({ required: [true, `'changed_by' must be required`] })
    changed_by: string;
}