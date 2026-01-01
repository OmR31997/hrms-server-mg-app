import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ISuccessResponse } from '@common/interfaces/payload.interface';
import { success } from '@common/utils';
import { Access } from '@common/decorators';
import { VisaHistoryService } from '../services/visa-history.service';
import { IVisaHistory } from '../interfaces/visa-history.interface';

@ApiBearerAuth("access-token")
@Controller('visa-history')
export class VisaHistoryController {
    constructor(private visaHistoryService: VisaHistoryService) { }

    @Get("/read")
    @Access({resource: "visa-history", action:"read"})
    async get_histories(): Promise<ISuccessResponse<IVisaHistory[]>> {
        const result = await this.visaHistoryService.readAll();
        return success("Visa history created successfully", result);
    }

    @Get("/:hId/read")
    @Access({resource: "visa-history", action:"read"})
    async get_history(@Param("hId") hId: string): Promise<ISuccessResponse<IVisaHistory>> {
        const result = await this.visaHistoryService.readSingle({ _id: hId });
        return success("Data fetched successfully", result);
    }

    @Delete("/:hId/delete")
    @Access({resource: "visa-history", action:"read"})
    async delete_history(@Param("hId") hId: string): Promise<ISuccessResponse<IVisaHistory>> {
        const result = await this.visaHistoryService.delete({ _id: hId });
        return success("Visa record deleted successfully", result);
    }
}