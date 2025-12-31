import { Types } from "mongoose";
import { Company } from "../company.schema";

export interface ICompany extends Partial<Company> {
    _id: Types.ObjectId;
}