import { Types } from "mongoose";
import { DocLog } from "../document_log.schema";

export interface IDocLog extends Partial<DocLog>{
    _id: Types.ObjectId;
}