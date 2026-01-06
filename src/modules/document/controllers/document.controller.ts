import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { DocumentService } from '../services/document.service';
import { CreateDocDto } from '../dto/create-doc.dto';
import { success } from '@common/utils';
import { IDocument } from '../interfaces/document.interface';
import { ISuccessResponse } from '@common/interfaces/payload.interface';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { Access } from '@common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from '@common/upload/upload.service';
import { UpdateDocDto } from '../dto/update-doc.dto';

@ApiBearerAuth('access-token')
@Controller('document')
export class DocumentController {

    constructor(
        private readonly docService: DocumentService,
        private readonly uploadService: UploadService
    ) { }

    @Post("/create")
    @Access({ resource: "document", action: "create" })
    @ApiConsumes("multipart/form-data")
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                employee_id: { type: 'string' },
                doc_type: { type: 'string', enum: ['passport', 'visa', 'contract'] },
                version: { type: 'number' },
                document: { type: 'string', format: 'binary' },
            },
            required: ['employee_id', 'doc_type', 'document'],
        },
    })
    @UseInterceptors(FileInterceptor("document"))
    async create_document(
        @Body() reqData: CreateDocDto,
        @UploadedFile() file: Express.Multer.File,
    ): Promise<ISuccessResponse<IDocument>> {
        const filePayload = {
            document: file ?? null
        }

        const result = await this.docService.create(reqData, filePayload);
        return success("Document created successfully", result);
    }

    @Get("/read")
    async get_documents(): Promise<ISuccessResponse<IDocument[]>> {
        const documents = await this.docService.readAll();
        return success("Data fetched successfully", documents);
    }

    @Get("/:docId/read")
    async get_document(@Param("docId") docId: string) {
        const document = await this.docService.readOne({ _id: docId });
        return success("Data fetched successfully", document);
    }

    @Patch("/:docId/update")
    @Access({ resource: "document", action: "update" })
    @ApiConsumes("multipart/form-data")
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                employee_id: { type: 'string' },
                doc_type: { type: 'string', enum: ['passport', 'visa', 'contract'] },
                version: { type: 'number' },
                document: { type: 'string', format: 'binary' },
            },
            required: ['employee_id', 'doc_type', 'document'],
        },
    })
    @UseInterceptors(FileInterceptor("document"))
    async update_document(
        @Req() req:any,
        @Param("docId") docId: string,
        @Body() reqData: UpdateDocDto,
        @UploadedFile() file: Express.Multer.File
    ): Promise<ISuccessResponse<IDocument>> {

        const filePayload = {
            document: file ?? null
        }
        
        const result = await this.docService.update(
            { _id: docId },
            reqData,
            filePayload,
            req.user
        )

        return success("Document updated successfully", result);
    }

    @Delete("/:docId/delete")
    async delete_doc(@Param("docId") docId: string) {
        const result = await this.docService.delete({ _id: docId });
        return success("Document updated successfully", result);
    }
}
