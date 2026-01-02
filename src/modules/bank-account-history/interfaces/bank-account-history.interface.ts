import { Types } from "mongoose";
import { BankAccountHistory } from "../bank-account-history.schema";

export interface IBankAccountHistory extends BankAccountHistory {
    _id: Types.ObjectId;
}