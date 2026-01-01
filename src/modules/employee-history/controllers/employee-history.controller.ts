import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ISuccessResponse } from '@common/interfaces/payload.interface';
import { success } from '@common/utils';
import { Access } from '@common/decorators';
import { EmployeeHistoryService } from '../services/employee-history.service';
import { IEmpoloyeeHistory } from '../interfaces/employee-history.interface';

@ApiBearerAuth('access-token')
@Controller('employee-history')
export class EmployeeHistoryController {
    constructor(private readonly employeeHistoryService: EmployeeHistoryService) { }

    @Get("/read")
    @Access({resource: "employee-history", action:"create"})
    async get_histories(): Promise<ISuccessResponse<IEmpoloyeeHistory[]>> {
        const result = await this.employeeHistoryService.readAll();
        return success("Data fetched successfully", result);
    }

    @Get("/:hId/read")
    @Access({resource: "employee-history", action:"read"})
    async get_history(@Param("hId") hId: string): Promise<ISuccessResponse<IEmpoloyeeHistory>> {
        const employeeHistories = await this.employeeHistoryService.readSingle({ _id: hId });
        return success("Data fetched successfully", employeeHistories);
    }

    @Delete("/:hId/delete")
    @Access({resource: "employee-history", action:"delete"})
    async delete_history(@Param("hId") hId: string): Promise<ISuccessResponse<IEmpoloyeeHistory>> {
        const result = await this.employeeHistoryService.delete({ _id: hId });
        return success("Employee history deleted successfully", result);
    }
}
