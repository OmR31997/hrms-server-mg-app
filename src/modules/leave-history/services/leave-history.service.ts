import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LeaveHistory, LeaveHistoryDocument } from '../leave-history.schema';
import { Model, Types } from 'mongoose';
import { CreateLeaveHistory } from '../types/create-leave-history.type';
import { JwtRequestPayload } from '@common/types/payload.type';
import { KeyValDto } from '@common/dto/key-val.dto';

interface ILeaveHistory extends LeaveHistory {
    _id: Types.ObjectId;
}

@Injectable()
export class LeaveHistoryService {
    constructor(@InjectModel(LeaveHistory.name) private leaveHistoryModel: Model<LeaveHistoryDocument>) { }

    async create(reqData: CreateLeaveHistory, user: JwtRequestPayload): Promise<ILeaveHistory> {
        const created = await this.leaveHistoryModel.create({
            ...reqData,
            leave_id: new Types.ObjectId(reqData.leave_id),
            performed_by: new Types.ObjectId(user.role_id)
        });

        return created;
    }

    async readAll(): Promise<ILeaveHistory[]> {
        const result = await this.leaveHistoryModel.find().lean();

        return result;
    }

    async readOne(keyVal: KeyValDto): Promise<ILeaveHistory> {
        const result = await this.leaveHistoryModel.findOne(keyVal).lean();

        if (!result) {
            throw new NotFoundException(`Leave history not found for ID: '${keyVal["_id"]}'`);
        }

        return result;
    }

    async delete(keyVal: KeyValDto): Promise<ILeaveHistory> {
        const deleted = await this.leaveHistoryModel.findOneAndDelete(keyVal);

        if (!deleted) {
            throw new NotFoundException(`Leave history not found for ID: '${keyVal["_id"]}'`);
        }

        return deleted;
    }
}
