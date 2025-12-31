import { Types } from "mongoose";
import { Visa } from "../visa.schema";

export interface IVisa extends Partial<Visa> {
    _id: Types.ObjectId;
}