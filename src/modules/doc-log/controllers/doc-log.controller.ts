import { Controller, Delete, Get, Param } from '@nestjs/common';
import { DocLogService } from '../services/doc-log.service';
import { IDocLog } from '../interfaces/doc-log.interface';
import { ISuccessResponse } from '@common/interfaces/payload.interface';
import { success } from '@common/utils';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth("access-token")
@Controller('doc-log')
export class DocLogController {
    constructor(
        private readonly docLogService:DocLogService
    ){}

    @Get("/read")
    async get_doc_logs(): Promise<ISuccessResponse<IDocLog[]>>{
        const result = await this.docLogService.readAll();
        return success("Data fetched successfully", result);
    }

    @Get("/:docLogId/read")
    async get_doc_log(@Param("docLogId") docLogId:string): Promise<ISuccessResponse<IDocLog>>{
        const result = await this.docLogService.readOne({_id: docLogId});
        return success("Data fetched successfully", result);
    }

    @Delete("/:docLogId/delete")
    async delete_doc_log(@Param("docLogId") docLogId:string): Promise<ISuccessResponse<IDocLog>>{
        const result = await this.docLogService.readOne({_id: docLogId});
        return success("Data fetched successfully", result);
    }
}
