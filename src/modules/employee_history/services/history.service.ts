import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EmployeeHistory, EmployeeHistoryDocument } from '../employee_history.schema';
import { ClientSession, Model } from 'mongoose';
import { success, SuccessResponse } from 'src/utils/respons.interface';
import { KeyValDto } from '../dto/key-val.dto';
import { CreateHistoryDto } from '../dto/create-history.dto';

@Injectable()
export class HistoryService {
    constructor(@InjectModel(EmployeeHistory.name) private historyModel: Model<EmployeeHistoryDocument>) { }

    async create(reqData: CreateHistoryDto,session: ClientSession) {
        const [history] = await this.historyModel.create([reqData], {session});
        return history;
    }

    async readAll(): Promise<SuccessResponse> {
        const histories = await this.historyModel.find().lean();
        return success("Data fetched successfully", histories);
    }

    async readById(keyVal: KeyValDto): Promise<SuccessResponse> {
        const history = await this.historyModel.findOne(keyVal).lean();

        if (!history) {
            throw new NotFoundException(`Employee history not found for ID: '${keyVal["_id"] || keyVal["employee_id"]}'`);
        }
        return success("Data fetched successfully", history);
    }

    async delete(keyVal: KeyValDto): Promise<SuccessResponse> {
        const deleted = await this.historyModel.findOneAndDelete(keyVal);
        if(!deleted) {
            throw new NotFoundException(`Employee history not found ID: '${keyVal._id}'`);
        }

        return success("Employee history deleted successfully", deleted);
    }
}
