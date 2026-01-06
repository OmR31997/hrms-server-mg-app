import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DocLog, DocLogDocument } from '../document_log.schema';
import { ClientSession, Model } from 'mongoose';
import { CreateDocLog } from '../types/create-doc-log.type';
import { IDocLog } from '../interfaces/doc-log.interface';
import { KeyValDto } from '../dto/keyVal.dto';

@Injectable()
export class DocLogService {
    constructor(
        @InjectModel(DocLog.name)
        private docLogModel:Model<DocLogDocument>
    ){}

    async create(reqData:CreateDocLog, session:ClientSession, ): Promise<IDocLog> {
        const [created] = await this.docLogModel.create([reqData], {session});

        return created;
    }

    async readAll(): Promise<IDocLog[]> {
        const result = await this.docLogModel.find().lean()
        return result;
    }

    async readOne(keyVal:KeyValDto): Promise<IDocLog> {
        const result = await this.docLogModel.findOne(keyVal).lean();

        if(!result) {
            throw new NotFoundException(`Doc log not found for ID: '${keyVal._id}'`)
        }

        return result;
    }

    async delete(keyVal:KeyValDto): Promise<IDocLog> {
        const deleted = await this.docLogModel.findOneAndDelete(keyVal);

        if(!deleted) {
            throw new NotFoundException(`Doc log not found for ID: '${keyVal._id}'`)
        }

        return deleted;
    }
}