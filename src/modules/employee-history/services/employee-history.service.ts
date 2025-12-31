import { Injectable, NotFoundException } from '@nestjs/common';
import { EmployeeHistory, EmployeeHistoryDocument } from '../employee_history.schema';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { CreateEmployeeHistoryDto } from '../dto/create-employee-history.dto';
import { success, SuccessResponse } from 'src/utils/response.interface';
import { KeyValDto } from '../dto/key-val.dto';

@Injectable()
export class EmployeeHistoryService {
    constructor(@InjectModel(EmployeeHistory.name) private employeeHistoryModel: Model<EmployeeHistoryDocument>) { }

    async create(reqData: CreateEmployeeHistoryDto,session: ClientSession) {
        const [history] = await this.employeeHistoryModel.create([reqData], {session});
        return history;
    }

    async readAll(): Promise<SuccessResponse> {
        const histories = await this.employeeHistoryModel.find().lean();
        return success("Data fetched successfully", histories);
    }

    async readById(keyVal: KeyValDto): Promise<SuccessResponse> {
        const history = await this.employeeHistoryModel.findOne(keyVal).lean();

        if (!history) {
            throw new NotFoundException(`Employee history not found for ID: '${keyVal["_id"] || keyVal["employee_id"]}'`);
        }
        return success("Data fetched successfully", history);
    }

    async delete(keyVal: KeyValDto): Promise<SuccessResponse> {
        const deleted = await this.employeeHistoryModel.findOneAndDelete(keyVal);
        if(!deleted) {
            throw new NotFoundException(`Employee history not found ID: '${keyVal._id}'`);
        }

        return success("Employee history deleted successfully", deleted);
    }
}
