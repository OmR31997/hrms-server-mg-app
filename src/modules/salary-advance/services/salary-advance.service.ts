import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SalaryAdvance, SalaryAdvanceDocument } from '../salary-advance.schema';
import { Model, Types } from 'mongoose';
import { CreateSalaryAdvanceDto } from '../dto/create-salary-advance.dto';
import { ISalaryAdvance } from '../interfaces/salary-advance.interface';
import { KeyValDto } from '../dto/key-val.dto';
import { UpdateSalaryAdvanceDto } from '../dto/update-salary-advance.dto';

@Injectable()
export class SalaryAdvanceService {
    constructor(
        @InjectModel(SalaryAdvance.name)
        private salaryAdvanceModel: Model<SalaryAdvanceDocument>
    ) { }

    async create(reqData: CreateSalaryAdvanceDto, approved_by:string): Promise<ISalaryAdvance> {
        const created = await this.salaryAdvanceModel.create({
            ...reqData,
            approved_by: new Types.ObjectId(approved_by)
        });
        return created;
    }

    async readAll(): Promise<ISalaryAdvance[]> {
        const result = await this.salaryAdvanceModel.find()
        .lean();

        return result;
    }

    async readOne(keyVal: KeyValDto): Promise<ISalaryAdvance> {
        const result = await this.salaryAdvanceModel.findOne(keyVal)
        .lean();

        if (!result) {
            throw new NotFoundException(`Account not found for ID: '${keyVal._id}'`)
        }

        return result;
    }

    async update(keyVal:KeyValDto, reqData: UpdateSalaryAdvanceDto, approved_by:string): Promise<ISalaryAdvance> {
        const updated = await this.salaryAdvanceModel.findOneAndUpdate(
            keyVal, 
            {
                ...reqData,
                approved_by: new Types.ObjectId(approved_by)
            },
            {new: true, runValidators: true}
        );

        if (!updated) {
            throw new NotFoundException(`Account not found for ID: '${keyVal._id}'`)
        }

        return updated;
    }

    async delete(keyVal:KeyValDto): Promise<ISalaryAdvance> {
        const deleted = await this.salaryAdvanceModel.findOneAndDelete(keyVal);

        if (!deleted) {
            throw new NotFoundException(`Account not found for ID: '${keyVal._id}'`)
        }

        return deleted;
    }
}
