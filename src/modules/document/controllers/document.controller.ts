import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { DocumentService } from '../services/document.service';
import { CreateDocDto } from '../dto/create-doc.dto';
import { success } from '@common/utils';
import { FileInterceptor } from '@nestjs/platform-express';
import { IDocument } from '../interfaces/document.interface';
import { ISuccessResponse } from '@common/interfaces/payload.interface';
import { memoryStorage } from 'multer';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { Access } from '@common/decorators';
import { multerConfig } from '@common/providers/upload.provider';

@ApiBearerAuth('access-token')
@Controller('document')
export class DocumentController {
    constructor(private docService: DocumentService) { }

    @Post("/create")
    @Access({ resource: "document", action: "create" })
    @ApiConsumes("multipart/form-data")
    @ApiBody({
        description: "Create a new document with file upload",
        type: CreateDocDto,
    })
    @UseInterceptors(
        FileInterceptor("document", multerConfig("DOC_", "document"))
    )
    async create_document(
        @Body() reqData: CreateDocDto,
        @UploadedFile() file: Express.Multer.File
    ): Promise<ISuccessResponse<IDocument>> {
        
        console.log("Controller")
        const filePayload = {
            document: file
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
    }

    @Patch("/:docId")
    @Access({ resource: "document", action: "update" })
    @ApiConsumes("multipart/form-data")
    @ApiBody({
        description: "Create a new document with file upload",
        type: CreateDocDto,
    })
    @UseInterceptors(
        FileInterceptor("document", multerConfig("DOC_", "document"))
    )
    async update_document(
        @Param("docId") docId: string,
        @Body() reqData: CreateDocDto,
        @UploadedFile() file: Express.Multer.File
    ): Promise<ISuccessResponse<IDocument>> {

        const filePayload = {
            document: file
        }

        const result = await this.docService.update(
            {_id: docId},
            reqData,
            filePayload
        )

        return success("Document updated successfully", result);
    }

    @Delete("/:docId/delete")
    async delete_doc(@Param("docId") docId:string) {
        const result = await this.docService.delete({_id: docId});
        return success("Document updated successfully", result);
    }
}
