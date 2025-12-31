import { Controller, Delete, Get, Param } from '@nestjs/common';
import { SuccessResponse } from 'src/utils/response.interface';
import { EmployeeHistoryService } from '../services/employee-history.service';

@Controller('employee-history')
export class EmployeeHistoryController {
    constructor(private readonly employeeHistoryService: EmployeeHistoryService) { }

    @Get("/read")
    async get_histories(): Promise<SuccessResponse> {
        return this.employeeHistoryService.readAll();
    }

    @Get("/:hId/read")
    async get_history(@Param("hId") hId: string): Promise<SuccessResponse> {
        return this.employeeHistoryService.readById({ _id: hId })
    }

    @Delete("/:hId/delete")
    async delete_history(@Param("hId") hId: string): Promise<SuccessResponse> {
        return this.employeeHistoryService.delete({ _id: hId });
    }
}
