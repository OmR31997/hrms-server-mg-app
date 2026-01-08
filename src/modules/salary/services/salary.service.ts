import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Salary, SalaryDocument } from '../salary.schema';
import { Model, Types } from 'mongoose';
import { CreateSalaryDto } from '../dto/create-salary.dto';
import { KeyValDto } from '../dto/key-val.dto';
import { UpdateSalaryDto } from '../dto/update-salary.dto';

export interface ISalary extends Salary {
    _id: Types.ObjectId;
}

@Injectable()
export class SalaryService {
    constructor(@InjectModel(Salary.name) private salaryModel: Model<SalaryDocument>) { }

    async create(reqData: CreateSalaryDto): Promise<ISalary> {
        const created = await this.salaryModel.create({
            ...reqData,
            employee_id: new Types.ObjectId(reqData.employee_id),
            bank_account_id: new Types.ObjectId(reqData.bank_account_id),
            lot_id: new Types.ObjectId(reqData.lot_id),
        });

        return created;
    }

    async readAll(): Promise<ISalary[]> {
        const salaries = await this.salaryModel.find().lean();

        return salaries;
    }

    async readById(keyVal: KeyValDto): Promise<ISalary> {
        const salary = await this.salaryModel.findOne(keyVal).lean();

        if (!salary) {
            throw new NotFoundException(`salary not found for ID: '${keyVal["_id"]}'`);
        }

        return salary;
    }

    async update(keyVal: KeyValDto, reqData: UpdateSalaryDto): Promise<ISalary> {
        const updated = await this.salaryModel.findOneAndUpdate(keyVal, reqData, { new: true, runValidators: true });

        if (!updated) {
            throw new NotFoundException(`salary not found for ID: '${keyVal["_id"]}'`);
        }

        return updated;
    }

    async delete(keyVal: KeyValDto): Promise<ISalary> {
        const deleted = await this.salaryModel.findOneAndDelete(keyVal);

        if (!deleted) {
            throw new NotFoundException(`salary not found for ID: '${keyVal["_id"]}'`);
        }

        return deleted;
    }
}
