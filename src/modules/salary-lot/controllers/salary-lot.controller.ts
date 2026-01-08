import { Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { SalaryLotService } from '../services/salary-lot.service';
import { Access } from '@common/decorators';
import { CreateSalaryLotDto } from '../dto/create-salary-lot.dto';
import { ApiResponse, SuccessInterceptor } from '@common/interceptors/success.interceptor';
import { UpdateSalaryLotDto } from '../dto/update-salary-lot.dto';

@ApiBearerAuth("access-token")
@Controller('salary-lot')
@UseInterceptors(SuccessInterceptor)
export class SalaryLotController {
    constructor(private readonly salaryLocService: SalaryLotService) { }

    @Post("/create")
    @Access({ resource: "salary-lot", action: "create" })
    async create_salary_lot(@Body() reqData: CreateSalaryLotDto): Promise<ApiResponse> {
        const result = await this.salaryLocService.create(reqData);
        return {message: "Salary lot successfully.", data: result};
    }

    @Get("/read")
    @Access({ resource: "salary-lot", action: "read" })
    async get_salary_lots(): Promise<ApiResponse> {
        const result = await this.salaryLocService.readAll();
        return {data: result}

    }

    @Get("/:lotId/read")
    @Access({ resource: "salary-lot", action: "read" })
    async get_salary_lot(@Param("lotId") lotId: string): Promise<ApiResponse> {
        const result = await this.salaryLocService.readById({ _id: lotId });
        return {data: result}
    }

    @Patch("/:lotId/update")
    @Access({ resource: "salary-lot", action: "update" })
    async update_salary_lot(@Param("lotId") lotId: string, @Body() reqData: UpdateSalaryLotDto): Promise<ApiResponse> {
        const result = await this.salaryLocService.update({ _id: lotId }, reqData);
        return {message: "Salary lot updated successfully", data: result};
    }

    @Delete("/:lotId/delete")
    @Access({ resource: "salary-lot", action: "delete" })
    async delete_salary_lot(@Param("lotId") lotId: string): Promise<ApiResponse> {
        const result = await this.salaryLocService.delete({ _id: lotId });
        return {message: "Salary lot deleted successfully", data: result};
    }
}
