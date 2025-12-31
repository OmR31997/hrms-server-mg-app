import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { VisaHistory, VisaHistoryDocument } from '../visa_history.schema';
import { ClientSession, Model } from 'mongoose';
import { CreateVisaHistoryDto } from '../dto/create-visa-history.dto';
import { KeyValDto } from '../dto/key-val.dto';
import { IVisaHistory } from '../interfaces/visa-history.interface';

@Injectable()
export class VisaHistoryService {
    constructor(@InjectModel(VisaHistory.name) private visaHistoryModel: Model<VisaHistoryDocument>) { }

    async create(reqData: CreateVisaHistoryDto, session: ClientSession): Promise<IVisaHistory> {
        const [created] = await this.visaHistoryModel.create([reqData], { session });
        return created;
    }

    async readAll(): Promise<IVisaHistory[]> {
        const visas = await this.visaHistoryModel.find().lean();
        return visas;
    }

    async readSingle(keyVal: KeyValDto): Promise<IVisaHistory> {
        const visaHistory = await this.visaHistoryModel.findOne(keyVal).lean();

        if (!visaHistory) {
            throw new NotFoundException(`Visa record not found for ID: '${keyVal["_id"] || keyVal["visa_id"]}'`);
        }

        return visaHistory;
    }

    async delete(keyVal:KeyValDto): Promise<IVisaHistory>{
        const deleted = await this.visaHistoryModel.findOneAndDelete(keyVal);

        if(!deleted) {
            throw new NotFoundException(`Visa record not found for ID: '${keyVal["_id"] || keyVal["visa_id"]}'`);
        }

        return deleted;
    }
}
