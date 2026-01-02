import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { DocumentService } from '../services/document.service';
import { CreateDocDto } from '../dto/create-doc.dto';
import { success } from '@common/utils';
import { FileInterceptor } from '@nestjs/platform-express';
import { IDocument } from '../interfaces/document.interface';
import { ISuccessResponse } from '@common/interfaces/payload.interface';
import type { UploadedRequest } from '@common/types/payload.type';
import { memoryStorage } from 'multer';

@Controller('document')
export class DocumentController {
    constructor(private docService: DocumentService) { }

    @Post("/create")
    @UseInterceptors(
        FileInterceptor("file", {
            storage: memoryStorage()
        })
    )
    async create_document(
        @Body() reqData: CreateDocDto,
        @UploadedFile() file: Express.Multer.File
    ): Promise<ISuccessResponse<IDocument>> {
        const result = await this.docService.create(reqData, file);
        return success("Document created successfully", result);
    }
}
