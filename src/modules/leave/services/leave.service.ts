import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Leave, LeaveDocument } from '../leave.schema';
import { Model, Types } from 'mongoose';
import { CreateLeaveDto } from '../dto/create-leave.dto';
import { KeyValDto } from '@common/dto/key-val.dto';
import { UpdateLeaveDto } from '../dto/update-leave.dto';
import { JwtRequestPayload } from '@common/types/payload.type';

interface ILeave extends Leave {
    _id: Types.ObjectId;
}

@Injectable()
export class LeaveService {
    constructor(@InjectModel(Leave.name) private leaveModel: Model<LeaveDocument>) { }

    async create(reqData: CreateLeaveDto, user:JwtRequestPayload): Promise<ILeave> {
        const created = await this.leaveModel.create({
            ...reqData,
            employee_id: new Types.ObjectId(reqData.employee_id)
        });

        return created;
    }

    async readAll(): Promise<ILeave[]> {
        const result = await this.leaveModel.find().lean();

        return result;
    }

    async readOne(keyVal: KeyValDto): Promise<ILeave> {
        const result = await this.leaveModel.findOne(keyVal).lean();

        if (!result) {
            throw new NotFoundException(`Leave not found for ID: '${keyVal["_id"]}'`);
        }

        return result;
    }

    async update(keyVal: KeyValDto, reqData: UpdateLeaveDto, user): Promise<ILeave> {
        const updated = await this.leaveModel.findOneAndUpdate(
            keyVal, 
            reqData, 
            { new: true, runValidators: true });

        if (!updated) {
            throw new NotFoundException(`Leave not found for ID: '${keyVal["_id"]}'`);
        }

        return updated;
    }

    async delete(keyVal: KeyValDto): Promise<ILeave> {
        const deleted = await this.leaveModel.findOneAndDelete(keyVal);

        if (!deleted) {
            throw new NotFoundException(`Leave not found for ID: '${keyVal["_id"]}'`);
        }

        return deleted;
    }
}
