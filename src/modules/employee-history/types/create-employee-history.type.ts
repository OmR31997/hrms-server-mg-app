import { Types } from "mongoose";

export class CreateEmployeeHistory {
    employee_id: Types.ObjectId;
    field_name: string;
    old_value: string;
    new_value: string;
    changed_by: Types.ObjectId;
}