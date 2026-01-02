import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BankAccountHistory } from '../bank-account-history.schema';
import { Model } from 'mongoose';
import { IBankAccountHistory } from '../interfaces/bank-account-history.interface';
import { CreateBankHistory } from '../types/bank-account-history.type';
import { KeyValDto } from '../dto/key-val.dto';

@Injectable()
export class BankAccountHistoryService {
    constructor(
        @InjectModel(BankAccountHistory.name)
        private bankHistoryModel: Model<BankAccountHistory>
    ) { }

    async create(reqData: CreateBankHistory): Promise<IBankAccountHistory> {
        const created = await this.bankHistoryModel.create(reqData);
        return created;
    }

    async readAll(): Promise<IBankAccountHistory[]> {
        const result = await this.bankHistoryModel.find();
        return result;
    }

    async readOne(keyVal:KeyValDto): Promise<IBankAccountHistory> {
        const result = await this.bankHistoryModel.findOne(keyVal);

        if(!result) {
            throw new NotAcceptableException(`Bank account history not found for ID: '${keyVal._id}'`)
        }

        return result;
    }

    async delete(keyVal:KeyValDto): Promise<IBankAccountHistory> {
        const deleted = await this.bankHistoryModel.findOneAndDelete(keyVal);
        if(!deleted) {
            throw new NotAcceptableException(`Bank account history not found for ID: '${keyVal._id}'`)
        }
        return deleted;
    }
}
