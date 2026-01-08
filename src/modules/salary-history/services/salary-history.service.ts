import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SalaryHistory, SalaryHistoryDocument } from '../salary-history.schema';
import { Model, Types } from 'mongoose';
import { CreateSalaryHistory } from '../types/create-salary-history.type';
import { KeyValDto } from '../dto/key-val.dto';

interface ISalaryHistory extends SalaryHistory {
    _id: Types.ObjectId;
}

@Injectable()
export class SalaryHistoryService {
    constructor(
        @InjectModel(SalaryHistory.name)
        private salaryHistoryModel: Model<SalaryHistoryDocument>
    ) { }

    async create(reqData: CreateSalaryHistory): Promise<ISalaryHistory> {
        const created = await this.salaryHistoryModel.create(reqData);

        return created;
    }

    async readAll(): Promise<ISalaryHistory[]> {
        const salaries = await this.salaryHistoryModel.find().lean();

        return salaries;
    }

    async readOne(keyVal: KeyValDto): Promise<ISalaryHistory> {
        const salary = await this.salaryHistoryModel.findOne(keyVal).lean();

        if (!salary) {
            throw new NotFoundException(`salary history not found for ID: '${keyVal["_id"]}'`);
        }

        return salary;
    }

    async delete(keyVal: KeyValDto): Promise<ISalaryHistory> {
        const deleted = await this.salaryHistoryModel.findOneAndDelete(keyVal);

        if (!deleted) {
            throw new NotFoundException(`salary history not found for ID: '${keyVal["_id"]}'`);
        }

        return deleted;
    }
}
