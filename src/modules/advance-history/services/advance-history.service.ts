import { Injectable, NotFoundException } from '@nestjs/common';
import { AdvanceHistory, AdvanceHistoryDocument } from '../advance-history.schema';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { IAdvanceHistory } from '../interfaces/advance-history.interface';
import { KeyValDto } from '../dto/keyVal.dto';

@Injectable()
export class AdvanceHistoryService {
    constructor(
        @InjectModel(AdvanceHistory.name)
        private advanceHistoryModel: Model<AdvanceHistoryDocument>
    ) { }

    async create(reqData: AdvanceHistory, session: ClientSession): Promise<IAdvanceHistory> {
        const [created] = await this.advanceHistoryModel.create([reqData], { session });
        return created
    }

    async readAll(): Promise<IAdvanceHistory[]> {
        const result = await this.advanceHistoryModel.find();
        return result;
    }
    
    async readOne(keyVal:KeyValDto): Promise<IAdvanceHistory> {
        const result = await this.advanceHistoryModel.findOne(keyVal);

        if(!result) {
            throw new NotFoundException(`Advance history not found ID: ${keyVal._id}`);
        }

        return result;
    }

    async update(keyVal:KeyValDto): Promise<IAdvanceHistory> {
        const updated = await this.advanceHistoryModel.findOneAndUpdate(keyVal);

        if(!updated) {
            throw new NotFoundException(`Advance history not found ID: ${keyVal._id}`);
        }

        return updated;
    }

    async delete(keyVal:KeyValDto): Promise<IAdvanceHistory> {
        const deleted = await this.advanceHistoryModel.findOneAndDelete(keyVal);

        if(!deleted) {
            throw new NotFoundException(`Advance history not found ID: ${keyVal._id}`);
        }

        return deleted;
    }
}
