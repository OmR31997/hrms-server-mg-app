import { Types } from "mongoose";
import { EmployeeHistory } from "../employee_history.schema";

export interface IEmpoloyeeHistory extends Partial<EmployeeHistory> {
    _id: Types.ObjectId
}