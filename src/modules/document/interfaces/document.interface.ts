import { Types } from "mongoose";
import { Doc } from "../doc.schema";

export interface IDocument extends Partial<Doc> {
    _id: Types.ObjectId;
}