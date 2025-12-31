import { Controller, Delete, Get, Param } from '@nestjs/common';
import { VisaHistoryService } from '../services/visa-history.service';
import { success, SuccessResponse } from 'src/utils/response.interface';
import { IVisaHistory } from '../interfaces/visa-history.interface';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth("access-token")
@Controller('visa-history')
export class VisaHistoryController {
    constructor(private visaHistoryService: VisaHistoryService) { }

    @Get("/read")
    async get_histories(): Promise<SuccessResponse<IVisaHistory[]>> {
        const result = await this.visaHistoryService.readAll();
        return success("Visa history created successfully", result);
    }

    @Get("/:hId/read")
    async get_history(@Param("hId") hId: string): Promise<SuccessResponse<IVisaHistory>> {
        const result = await this.visaHistoryService.readSingle({ _id: hId });
        return success("Data fetched successfully", result);
    }

    @Delete("/:hId/delete")
    async delete_history(@Param("hId") hId: string): Promise<SuccessResponse<IVisaHistory>> {
        const result = await this.visaHistoryService.delete({ _id: hId });
        return success("Visa record deleted successfully", result);
    }
}