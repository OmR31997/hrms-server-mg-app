import { Types } from "mongoose";
import { BankAccount } from "../bank-account.schema";

export interface IBankAccount extends BankAccount {
    _id: Types.ObjectId;
}