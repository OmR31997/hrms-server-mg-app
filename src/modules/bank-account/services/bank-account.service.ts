import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BankAccount, BankAccountDocument } from '../bank-account.schema';
import { Model } from 'mongoose';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';
import { IBankAccount } from '../interfaces/bank-account.interface';
import { KeyValDto } from '../dto/key-val.dto';
import { UpadateBankAccountDto } from '../dto/update-branch.dto';

@Injectable()
export class BankAccountService {
    constructor(
        @InjectModel(BankAccount.name)
        private bankAccountModel: Model<BankAccountDocument>
    ) { }

    async create(reqData: CreateBankAccountDto): Promise<IBankAccount> {
        const created = await this.bankAccountModel.create(reqData);
        return created;
    }

    async readAll(): Promise<IBankAccount[]> {
        const result = await this.bankAccountModel.find();
        return result;
    }

    async readOne(keyVal: KeyValDto): Promise<IBankAccount> {
        const result = await this.bankAccountModel.findOne(keyVal);

        if (!result) {
            throw new NotFoundException(`Bank account not found for ID: '${keyVal._id || keyVal.employee_id || keyVal.account_no}'`)
        }
        return result;
    }

    async update(keyVal: KeyValDto, reqData: UpadateBankAccountDto): Promise<IBankAccount> {

        const updated = await this.bankAccountModel.findOneAndUpdate(
            keyVal,
            reqData,
            { new: true, runValidators: true }
        );

        if (!updated) {
            throw new NotFoundException(`Bank account not found for ID: '${keyVal._id || keyVal.employee_id || keyVal.account_no}'`)
        }

        return updated;
    }

    async delete(keyVal: KeyValDto): Promise<IBankAccount> {
        const deleted = await this.bankAccountModel.findOneAndDelete(keyVal);

        if(!deleted) {  
            throw new NotFoundException(`Bank account not found for ID: '${keyVal._id || keyVal.employee_id || keyVal.account_no}'`)
        }

        return deleted;
    }
}
