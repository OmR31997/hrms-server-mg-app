import { PartialType } from "@nestjs/mapped-types";
import { CreateBankAccountDto } from "./create-bank-account.dto";

export class UpadateBankAccountDto extends PartialType(CreateBankAccountDto) {}