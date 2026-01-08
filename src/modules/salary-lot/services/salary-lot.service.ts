import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSalaryLotDto } from '../dto/create-salary-lot.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { SalaryLot, SalaryLotDocument } from '../salaray-lot.schema';
import { KeyValDto } from '../dto/key-val.dto';
import { UpdateSalaryLotDto } from '../dto/update-salary-lot.dto';

interface ISalaryLot extends SalaryLot {
    _id: Types.ObjectId;
}

@Injectable()
export class SalaryLotService {
    constructor(@InjectModel(SalaryLot.name) private salaryLotModel: Model<SalaryLotDocument>) { }

    async create(reqData: CreateSalaryLotDto): Promise<ISalaryLot> {
        const created = await this.salaryLotModel.create({
            ...reqData,
            company_id: new Types.ObjectId(reqData.company_id),
            created_by: new Types.ObjectId()
        });

        return created;
    }

    async readAll(): Promise<ISalaryLot[]> {
        const salaryLocs = await this.salaryLotModel.find().lean();

        return salaryLocs;
    }

    async readById(keyVal: KeyValDto): Promise<ISalaryLot> {
        const salaryLoc = await this.salaryLotModel.findOne(keyVal).lean();

        if (!salaryLoc) {
            throw new NotFoundException(`Salary loc not found for ID: '${keyVal["_id"]}'`);
        }

        return salaryLoc;
    }

    async update(keyVal: KeyValDto, reqData: UpdateSalaryLotDto): Promise<ISalaryLot> {
        const updated = await this.salaryLotModel.findOneAndUpdate(keyVal, reqData, { new: true, runValidators: true });

        if (!updated) {
            throw new NotFoundException(`Salary loc not found for ID: '${keyVal["_id"]}'`);
        }

        return updated;
    }

    async delete(keyVal: KeyValDto): Promise<ISalaryLot> {
        const deleted = await this.salaryLotModel.findOneAndDelete(keyVal);

        if (!deleted) {
            throw new NotFoundException(`Salary loc not found for ID: '${keyVal["_id"]}'`);
        }

        return deleted;
    }
}
