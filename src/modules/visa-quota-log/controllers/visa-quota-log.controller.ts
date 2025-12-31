import { Controller, Delete, Get, Param } from '@nestjs/common';
import { VisaQuotaLogService } from '../services/visa-quota-log.service';
import { success, SuccessResponse } from 'src/utils/response.interface';
import { IVisaQuotaLog } from '../interfaces/visa-quota.interface';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth("access-token")
@Controller('visa-quota-log')
export class VisaQuotaLogController {
    constructor(private readonly visaQuotaLogService: VisaQuotaLogService) { }

    @Get("/read")
    async get_quota_logs(): Promise<SuccessResponse<IVisaQuotaLog[]>> {
        const result = await this.visaQuotaLogService.readAll();
        return success("Data fetched successfully", result);
    }

    @Get("/:logId/read")
    async get_quota_log(@Param("logId") logId: string): Promise<SuccessResponse<IVisaQuotaLog>> {
        const result = await this.visaQuotaLogService.readSingle({ _id: logId });
        return success("Data fetched successfully", result);
    }

    @Delete("/:logId/delete")
    async delete_quota_log(@Param("logId") logId: string): Promise<SuccessResponse<IVisaQuotaLog>> {
        const result = await this.visaQuotaLogService.delete({ _id: logId });
        return success("Visa quota log deleted successfully", result);
    }
}