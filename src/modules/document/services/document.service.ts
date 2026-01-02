import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDocDto } from '../dto/create-doc.dto';
import { IDocument } from '../interfaces/document.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Doc, DocDocument } from '../doc.schema';
import { Model } from 'mongoose';
import { KeyValDto } from '../dto/keyVal.dto';
import { UpdateDocDto } from '../dto/update-doc.dto';
import { UploadedRequest } from '@common/types/payload.type';
import { saveFileLocally, validateFiles } from '@common/utils/fileHelper.util';
import { uploadFilesWithRollBack } from '@common/utils/upload.util';

@Injectable()
export class DocumentService {
    constructor(
        @InjectModel(Doc.name) private docModel:Model<DocDocument>
    ){}
    async create(reqData: CreateDocDto, file: UploadedRequest): Promise<IDocument> {
        
        if(file) {
            uploadFilesWithRollBack([file], "htms/documents")
        }

        
        const file_path = saveFileLocally(file);
        
        const created = await this.docModel.create(reqData);
        return created;
    }

    async readAll(): Promise<IDocument[]> {
        const documents = await this.docModel.find().lean();
        return documents;
    }

    async readOne(keyVal: KeyValDto): Promise<IDocument> {
        const document = await this.docModel.findOne(keyVal).lean();

        if (!document) {
            throw new NotFoundException(`Document not found for ID: '${keyVal["_id"]}'`);
        }

        return document;
    }

    async update(keyVal: KeyValDto, reqData: UpdateDocDto): Promise<IDocument> {

        const updated = await this.docModel.findOneAndUpdate(keyVal, reqData, { new: true, runValidators: true });

        if (!updated) {
            throw new NotFoundException(`Document not found for ID: '${keyVal["_id"]}'`);
        }

        return updated;
    }

    async delete(keyVal: KeyValDto): Promise<IDocument> {
        const deleted = await this.docModel.findOneAndDelete(keyVal);

        if (!deleted) {
            throw new NotFoundException(`Document not found for ID: '${keyVal["_id"]}'`);
        }

        return deleted;
    }
}
