import { Controller, Delete, Get, Param } from '@nestjs/common';
import { HistoryService } from '../services/history.service';
import { SuccessResponse } from 'src/utils/respons.interface';

@Controller('history')
export class HistoryController {
    constructor(private readonly historyService: HistoryService) { }

    @Get("/read")
    async get_histories(): Promise<SuccessResponse> {
        return this.historyService.readAll();
    }

    @Get("/:empId")
    async get_history(@Param("empId") empId: string): Promise<SuccessResponse> {
        return this.historyService.readById({ employee_id: empId })
    }

    @Delete("/:empId/delete")
    async delete_history(@Param("empId") empId: string): Promise<SuccessResponse> {
        return this.historyService.delete({ employee_id: empId });
    }
}
