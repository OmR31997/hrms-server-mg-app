import { Access } from '@common/decorators';
import { ApiResponse, SuccessInterceptor } from '@common/interceptors/success.interceptor';
import { Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { SalaryService } from '../services/salary.service';
import { CreateSalaryDto } from '../dto/create-salary.dto';
import { UpdateSalaryDto } from '../dto/update-salary.dto';

@ApiBearerAuth("access-token")
@Controller('salary')
@UseInterceptors(SuccessInterceptor)
export class SalaryController {
    constructor(private readonly salaryService: SalaryService) { }

    @Post("/create")
    @Access({ resource: "salary", action: "create" })
    async create_salary_lot(@Body() reqData: CreateSalaryDto): Promise<ApiResponse> {
        const result = await this.salaryService.create(reqData);
        return { message: "Salary created successfully.", data: result };
    }

    @Get("/read")
    @Access({ resource: "salary", action: "read" })
    async get_salaries(): Promise<ApiResponse> {
        const result = await this.salaryService.readAll();
        return { data: result }
    }

    @Get("/:salId/read")
    @Access({ resource: "salary", action: "read" })
    async get_salary(@Param("salId") salId: string): Promise<ApiResponse> {
        const result = await this.salaryService.readById({ _id: salId });
        return { data: result }
    }

    @Patch("/:salId/update")
    @Access({ resource: "salary", action: "update" })
    async update_salary(@Param("salId") salId: string, @Body() reqData: UpdateSalaryDto): Promise<ApiResponse> {
        const result = await this.salaryService.update({ _id: salId }, reqData);
        return { message: "Salary updated successfully", data: result };
    }

    @Delete("/:salId/delete")
    @Access({ resource: "salary", action: "delete" })
    async delete_salary(@Param("salId") salId: string): Promise<ApiResponse> {
        const result = await this.salaryService.delete({ _id: salId });
        return { message: "Salary lot deleted successfully", data: result };
    }
}
