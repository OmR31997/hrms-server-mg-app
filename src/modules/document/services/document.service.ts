import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDocDto } from '../dto/create-doc.dto';
import { IDocument } from '../interfaces/document.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Doc, DocDocument } from '../doc.schema';
import { Model } from 'mongoose';
import { KeyValDto } from '../dto/keyVal.dto';
import { UpdateDocDto } from '../dto/update-doc.dto';
import { FilePath, FilePayload} from '@common/types/payload.type';
import { } from '@common/utils/fileHelper.util';
import { deleteuploadedFiles, uploadFilesWithRollBack } from '@common/utils/upload.util';

@Injectable()
export class DocumentService {
    constructor(
        @InjectModel(Doc.name) private docModel: Model<DocDocument>
    ) { }
    async create(reqData: CreateDocDto, reqFile: FilePayload): Promise<IDocument> {
        const { document } = reqFile;

        let uploadedPath: FilePath = null;

        if (document) {
            const result = await uploadFilesWithRollBack(document, "VHRMS/document");
            uploadedPath = result ?? null;
        }

        const created = await this.docModel.create({
            ...reqData,
            file_path: uploadedPath
        });

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

    async update(keyVal: KeyValDto, reqData: UpdateDocDto, reqFile: FilePayload): Promise<IDocument> {

        const { document } = reqFile;

        let uploadedPath: FilePath = null;

        if (document) {
            const docDetail = await this.docModel.findOne(keyVal).select("file_path");

            const result = await uploadFilesWithRollBack(document, "VHRMS/documents");
            uploadedPath = result ?? null;

            if(docDetail?.file_path) {
                await deleteuploadedFiles(docDetail.file_path)
            }
        }

        const updated = await this.docModel.findOneAndUpdate(
            keyVal, 
            {
                ...reqData,
                file_path: uploadedPath
            }, 
            { new: true, runValidators: true }
        );

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

        await deleteuploadedFiles(deleted.file_path);

        return deleted;
    }
}
