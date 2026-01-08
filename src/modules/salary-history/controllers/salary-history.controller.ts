import { Controller, Delete, Get, Param, UseInterceptors } from '@nestjs/common';
import { SalaryHistoryService } from '../services/salary-history.service';
import { ApiResponse, SuccessInterceptor } from '@common/interceptors/success.interceptor';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth("access-token")
@Controller('salary-history')
@UseInterceptors(SuccessInterceptor)
export class SalaryHistoryController {
    constructor(private salaryHistoryService: SalaryHistoryService) { }

    @Get("/read")
    async get_salary_histories(): Promise<ApiResponse> {
        const result = await this.salaryHistoryService.readAll();
        return {data: result}
    }

    @Get("/:hId/read")
    async get_salary_history(@Param("hId") hId: string): Promise<ApiResponse> {
        const result = await this.salaryHistoryService.readOne({_id: hId});
        return {data: result}
    }

    @Delete("/:hId/delete")
    async delete_salary(@Param("hId") hId: string): Promise<ApiResponse> {
        const result = await this.salaryHistoryService.delete({_id: hId});
        return {message: "Salary history deleted successfully", data: result};
    }
}
