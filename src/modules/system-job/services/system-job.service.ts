import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SystemJob, SystemJobDocument } from '../system-job.schema';
import { Model, Types } from 'mongoose';
import { KeyValDto } from '@common/dto/key-val.dto';

interface ISystemJob extends SystemJob {
    _id: Types.ObjectId;
}

@Injectable()
export class SystemJobService {
    constructor(
        @InjectModel(SystemJob.name)
        private systemJobModel:Model<SystemJobDocument>
    ){}

    async create(reqData:SystemJob): Promise<ISystemJob> {
        const created = await this.systemJobModel.create(reqData);
        return created
    }

    async readAll(): Promise<ISystemJob[]> {
        const result = await this.systemJobModel.find();
        return result;
    }

    async readOne(keyVal:KeyValDto): Promise<ISystemJob> {
        const result = await this.systemJobModel.findOne(keyVal);

        if(!result) {
            throw new NotFoundException(`System job detail not found for ID: '${keyVal._id}'`);
        }

        return result;
    }

    async delete(keyVal:KeyValDto): Promise<ISystemJob> {
        const deleted = await this.systemJobModel.findOneAndDelete(keyVal);

        if(!deleted) {
            throw new NotFoundException(`System job not found for ID: '${keyVal._id}'`);
        }
        
        return deleted;
    }
}
