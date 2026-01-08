import { Types } from "mongoose"

export type CreateSalaryHistory = {
    salary_id: Types.ObjectId,
    field_name: string,
    old_value: number,
    new_value: number;
    changed_by: Types.ObjectId;    
}