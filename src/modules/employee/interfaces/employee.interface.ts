import { Types } from "mongoose";
import { Employee } from "../employee.schema";

export interface IEmployee extends Partial<Employee>{
    _id: Types.ObjectId;
}