import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { SalaryLock, SalaryLockDocument } from '../salary-lock.schema';
import { CreateSalaryLockDto } from '../dto/create-salary-lock.dto';
import { KeyValDto } from '../dto/key-val.dto';
import { UpdateSalaryLockDto } from '../dto/update-salary-lock.dto';

interface ISalaryLock extends SalaryLock {
    _id: Types.ObjectId;
}

@Injectable()
export class SalaryLockService {
    constructor(
        @InjectModel(SalaryLock.name)
        private salaryLockModel: Model<SalaryLockDocument>
    ) { }

    async create(reqData: CreateSalaryLockDto): Promise<ISalaryLock> {
        const created = await this.salaryLockModel.create({
            ...reqData,
            salary_id: new Types.ObjectId(reqData.salary_id),
            locked_by: new Types.ObjectId(reqData.locked_by),
            unlocked_by: new Types.ObjectId(reqData.unlocked_by)
        });

        return created;
    }

    async readAll(): Promise<ISalaryLock[]> {
        const salaries = await this.salaryLockModel.find().lean();

        return salaries;
    }

    async readOne(keyVal: KeyValDto): Promise<ISalaryLock> {
        const salary = await this.salaryLockModel.findOne(keyVal).lean();

        if (!salary) {
            throw new NotFoundException(`salary lock details not found for ID: '${keyVal["_id"]}'`);
        }

        return salary;
    }

    async update(keyVal: KeyValDto, reqData:UpdateSalaryLockDto): Promise<ISalaryLock> {
        const updated = await this.salaryLockModel.findOneAndUpdate(keyVal);

        if (!updated) {
            throw new NotFoundException(`salary details not found for ID: '${keyVal["_id"]}'`);
        }

        return updated;
    }

    async delete(keyVal: KeyValDto): Promise<ISalaryLock> {
        const deleted = await this.salaryLockModel.findOneAndDelete(keyVal);

        if (!deleted) {
            throw new NotFoundException(`salary details not found for ID: '${keyVal["_id"]}'`);
        }

        return deleted;
    }
}
