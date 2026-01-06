import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDocDto } from '../dto/create-doc.dto';
import { IDocument } from '../interfaces/document.interface';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Doc, DocDocument } from '../doc.schema';
import { Connection, Model, Types } from 'mongoose';
import { KeyValDto } from '../dto/keyVal.dto';
import { UpdateDocDto } from '../dto/update-doc.dto';
import { FilePath, FilePayload, JwtRequestPayload } from '@common/types/payload.type';
import { UploadService } from '@common/upload/upload.service';
import { withTransaction } from '@common/utils';
import { DocLogService } from '@module/doc-log/services/doc-log.service';
import { Action } from '@module/doc-log/types/create-doc-log.type';

@Injectable()
export class DocumentService {
    constructor(
        @InjectModel(Doc.name)
        private docModel: Model<DocDocument>,
        private uploadService: UploadService,

        @InjectConnection()
        private readonly connection: Connection,

        private readonly docLogService: DocLogService,
    ) { }

    async create(reqData: CreateDocDto, reqFile: FilePayload): Promise<IDocument> {
        const { document } = reqFile;

        let uploadedPath: FilePath | undefined = null;

        if (document) {
            uploadedPath = await this.uploadService.uploadWithRollback(document, "VHRMS/documents");

            reqData.file_path = uploadedPath;
        }

        try {
            const created = await this.docModel.create(reqData);
            return created;
        } catch (error) {
            if (uploadedPath) {
                await this.uploadService.deleteuploadedFiles(uploadedPath);
            }

            throw error;
        }
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

    async update(keyVal: KeyValDto, reqData: UpdateDocDto, reqFile: FilePayload, user: JwtRequestPayload): Promise<IDocument> {

        const { document } = reqFile;

        let newFilePath: FilePath | undefined;

        if (document) {
            newFilePath = await this.uploadService.uploadWithRollback(document, "VHRMS/documents");
            reqData.file_path = newFilePath;
        }

        try {

            return withTransaction(this.connection, async (session) => {

                const docDetail = await this.docModel.findOne(keyVal).session(session);

                if (!docDetail) {
                    throw new NotFoundException("Document not found");
                }

                const oldFilePath = docDetail.file_path;

                await this.docLogService.create({
                    document_id: docDetail._id,
                    action: document ? Action.UPLOAD : Action.UPDATE,
                    performed_by: new Types.ObjectId(user.role_id)
                },
                    session
                );

                const cleanReqData = Object.fromEntries(Object.entries(reqData).filter(([_, v]) => v !== undefined))

                Object.assign(docDetail, cleanReqData);

                await docDetail.save({ session });

                if (document && oldFilePath) {
                    await this.uploadService.deleteuploadedFiles(oldFilePath);
                }

                return docDetail;
            });
        } catch (error) {
            if (newFilePath) {
                await this.uploadService.deleteuploadedFiles(newFilePath);
            }

            throw error;
        }
    }

    async delete(keyVal: KeyValDto): Promise<IDocument> {
        const deleted = await this.docModel.findOneAndDelete(keyVal);

        if (!deleted) {
            throw new NotFoundException(`Document not found for ID: '${keyVal["_id"]}'`);
        }

        await this.uploadService.deleteuploadedFiles(deleted.file_path);

        return deleted;
    }
}
