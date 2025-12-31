import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { VisaQuotaLog, VisaQuotaLogDocument } from '../visa_quota_log.schema';
import { ClientSession, Model } from 'mongoose';
import { CreateVisaQuotaLogDto } from '../dto/create-visa-quota-log.dto';
import { KeyValDto } from '../dto/key-val.dto';
import { IVisaQuotaLog } from '../interfaces/visa-quota.interface';

@Injectable()
export class VisaQuotaLogService {
    constructor(@InjectModel(VisaQuotaLog.name) private visaQuotaLogModel: Model<VisaQuotaLogDocument>) { }

    async create(reqData: CreateVisaQuotaLogDto, session: ClientSession): Promise<IVisaQuotaLog> {
        const [created] = await this.visaQuotaLogModel.create([reqData], { session });
        return created;
    }

    async readAll(): Promise<IVisaQuotaLog[]> {
        const visaOuotaLogs = await this.visaQuotaLogModel.find().lean();

        return visaOuotaLogs;
    }

    async readSingle(keyVal: KeyValDto): Promise<IVisaQuotaLog> {
        const visaQuotaLog = await this.visaQuotaLogModel.findOne(keyVal).lean();

        if (!visaQuotaLog) {
            throw new NotFoundException(`Visa quota log not found for ID: '${keyVal["_id"]}'`);
        }

        return visaQuotaLog;
    }

    async delete(keyVal: KeyValDto): Promise<IVisaQuotaLog> {
        const deleted = await this.visaQuotaLogModel.findOneAndDelete(keyVal);

        if (!deleted) {
            throw new NotFoundException(`Visa quota log not found for ID: '${keyVal["_id"]}'`);
        }

        return deleted;
    }
}