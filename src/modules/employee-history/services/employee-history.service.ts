import { Injectable, NotFoundException } from '@nestjs/common';
import { EmployeeHistory, EmployeeHistoryDocument } from '../employee_history.schema';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { KeyValDto } from '../dto/key-val.dto';
import { IEmpoloyeeHistory } from '../interfaces/employee-history.interface';
import { CreateEmployeeHistory } from '../controllers/types/create-employee-history.type';

@Injectable()
export class EmployeeHistoryService {
    constructor(@InjectModel(EmployeeHistory.name) private employeeHistoryModel: Model<EmployeeHistoryDocument>) { }

    async create(reqData: CreateEmployeeHistory,session: ClientSession): Promise<IEmpoloyeeHistory> {
        const [history] = await this.employeeHistoryModel.create([reqData], {session});
        return history;
    }

    async readAll(): Promise<IEmpoloyeeHistory[]> {
        const employeeHistories = await this.employeeHistoryModel.find().lean();
        return employeeHistories;
    }

    async readSingle(keyVal: KeyValDto): Promise<IEmpoloyeeHistory> {
        const employeeHistory = await this.employeeHistoryModel.findOne(keyVal).lean();

        if (!employeeHistory) {
            throw new NotFoundException(`Employee history not found for ID: '${keyVal["_id"] || keyVal["employee_id"]}'`);
        }
        return employeeHistory;
    }

    async delete(keyVal: KeyValDto): Promise<IEmpoloyeeHistory> {
        const deleted = await this.employeeHistoryModel.findOneAndDelete(keyVal);
        if(!deleted) {
            throw new NotFoundException(`Employee history not found ID: '${keyVal._id}'`);
        }

        return deleted;
    }
}
