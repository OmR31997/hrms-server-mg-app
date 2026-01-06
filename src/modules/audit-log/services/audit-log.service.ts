import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { AuditLog, AuditLogDocument } from '../audit-log.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuditLogService {
    constructor(
        // @InjectModel(AuditLog.name)
        // private auditModel: Model<AuditLogDocument>
    ) { }

    async create() {
        
    }
}
