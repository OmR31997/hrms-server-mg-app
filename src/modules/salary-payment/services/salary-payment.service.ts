import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SalaryPayment, SalaryPaymentDocument } from '../salary-payment.schema';
import { Model, Types } from 'mongoose';
import { CreateSalaryPaymentDto } from '../dto/create-salary-payment.dto';
import { KeyValDto } from '../dto/key-val.dto';
import { UpdateSalaryPaymentDto } from '../dto/update-salary-payment.dto';

interface ISalaryPayment extends SalaryPayment {
    _id: Types.ObjectId;
}

@Injectable()
export class SalaryPaymentService {
    constructor(
        @InjectModel(SalaryPayment.name)
        private salaryPaymentModel: Model<SalaryPaymentDocument>
    ) { }

    async create(reqData: CreateSalaryPaymentDto): Promise<ISalaryPayment> {
        const created = await this.salaryPaymentModel.create({
            ...reqData,
            salary_id: new Types.ObjectId(reqData.salary_id)
        });

        return created;
    }

    async readAll(): Promise<ISalaryPayment[]> {
        const salaryPayments = await this.salaryPaymentModel.find().lean();

        return salaryPayments;
    }

    async readOne(keyVal: KeyValDto): Promise<ISalaryPayment> {
        const salaryPayment = await this.salaryPaymentModel.findOne(keyVal).lean();

        if (!salaryPayment) {
            throw new NotFoundException(`Salary payment not found for ID: '${keyVal["_id"]}'`);
        }

        return salaryPayment;
    }

    async update(keyVal: KeyValDto, reqData: UpdateSalaryPaymentDto): Promise<ISalaryPayment> {
        const updated = await this.salaryPaymentModel.findOneAndUpdate(keyVal, reqData, { new: true, runValidators: true });

        if (!updated) {
            throw new NotFoundException(`Salary payment not found for ID: '${keyVal["_id"]}'`);
        }

        return updated;
    }

    async delete(keyVal: KeyValDto): Promise<ISalaryPayment> {
        const deleted = await this.salaryPaymentModel.findOneAndDelete(keyVal);

        if (!deleted) {
            throw new NotFoundException(`Salary payment not found for ID: '${keyVal["_id"]}'`);
        }

        return deleted;
    }
}