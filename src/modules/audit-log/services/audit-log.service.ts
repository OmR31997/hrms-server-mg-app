import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuditLog, AuditLogDocument } from '../audit-log.schema';
import { Model, Types } from 'mongoose';
import { CreateAuditLog } from '../types/create-audit-log.type';
import { KeyValDto } from '@common/dto/key-val.dto';

interface IAuditLog extends AuditLog {
    _id: Types.ObjectId;
}

@Injectable()
export class AuditLogService {
    constructor(
        @InjectModel(AuditLog.name)
        private auditLogModel: Model<AuditLogDocument>
    ) { }

    async create(reqData: CreateAuditLog): Promise<IAuditLog> {
        const created = await this.auditLogModel.create(reqData);
        return created;
    }

    async readAll(): Promise<IAuditLog[]> {
        const result = await this.auditLogModel.find().lean();
        return result;
    }

    async readOne(keyVal:KeyValDto): Promise<IAuditLog> {
        const result = await this.auditLogModel.findOne().lean();

        if(!result) {
            throw new NotFoundException(`Audit log not found for ID: '${keyVal._id}'`);
        }

        return result;
    }

    async delete(keyVal:KeyValDto) {
        const deleted = await this.auditLogModel.findOneAndDelete(keyVal);

        if(!deleted) {
            throw new NotFoundException(`Audit log not found for ID: '${keyVal._id}'`);
        }

        return deleted;
    }
}
