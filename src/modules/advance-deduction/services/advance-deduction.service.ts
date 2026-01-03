import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AdvanceDeduction, AdvanceDeductionDocument } from '../advance-deduction.schema';
import { Model, Types } from 'mongoose';
import { CreateAdvanceDeduction } from '../types/create-advance-deduction.type';
import { IAdvanceDeduction } from '../interface/advance-deduction.inteface';
import { KeyValDto } from '../dto/keyVal.dto';

@Injectable()
export class AdvanceDeductionService {
    constructor(
        @InjectModel(AdvanceDeduction.name)
        private advanceDeductionModel: Model<AdvanceDeductionDocument>
    ) { }

    async create(reqData: CreateAdvanceDeduction): Promise<IAdvanceDeduction> {

        const created = await this.advanceDeductionModel.create(reqData);
        return created;
    }

    async readAll(): Promise<IAdvanceDeduction[]> {
        const result = await this.advanceDeductionModel.find().lean();
        return result;
    }

    async readOne(keyVal: KeyValDto): Promise<IAdvanceDeduction> {
        const result = await this.advanceDeductionModel.findOne(keyVal).lean();

        if (!result) {
            throw new NotFoundException(`Deduction not found for ID: '${keyVal["_id"] || keyVal["role_id"]}'`);
        }

        return result;
    }

    async delete(keyVal: KeyValDto): Promise<IAdvanceDeduction> {
        const deleted = await this.advanceDeductionModel.findOneAndDelete(keyVal);

        if (!deleted) {
            throw new NotFoundException(`Deduction not found for ID: '${keyVal["_id"]}'`);
        }

        return deleted;
    }
}
