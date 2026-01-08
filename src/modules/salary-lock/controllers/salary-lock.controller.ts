import { Access } from '@common/decorators';
import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseInterceptors } from '@nestjs/common';
import { SalaryLockService } from '../services/salary-lock.service';
import { CreateSalaryLockDto } from '../dto/create-salary-lock.dto';
import { ApiResponse, SuccessInterceptor } from '@common/interceptors/success.interceptor';
import { UpdateSalaryLockDto } from '../dto/update-salary-lock.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth("access-token")
@Controller('salary-lock')
@UseInterceptors(SuccessInterceptor)
export class SalaryLockController {
    constructor(private readonly salaryLockService: SalaryLockService) { }
    
        @Post("/create")
        @Access({ resource: "salary-lock", action: "create" })
        async create_salary_lock(@Body() reqData: CreateSalaryLockDto): Promise<ApiResponse> {
            const result = await this.salaryLockService.create(reqData);
            return {message: "Salary locked successfully.", data: result};
        }
    
        @Get("/read")
        @Access({ resource: "salary-lock", action: "read" })
        async get_salary_locks(): Promise<ApiResponse> {
            const result = await this.salaryLockService.readAll();
            return {data: result}
        }
    
        @Get("/:lockId/read")
        @Access({ resource: "salary-lock", action: "read" })
        async get_salary_lock(@Param("lockId") lockId: string): Promise<ApiResponse> {
            const result = await this.salaryLockService.readOne({ _id: lockId });
            return {data: result}
        }
    
        @Patch("/:lockId/update")
        @Access({ resource: "salary-lock", action: "update" })
        async update_salary_lock(@Req() req:any, @Param("lockId") lockId: string, @Body() reqData: UpdateSalaryLockDto): Promise<ApiResponse> {
            const result = await this.salaryLockService.update({ _id: lockId }, reqData);
            return {message: "Salary lock updated successfully", data: result};
        }
    
        @Delete("/:lockId/delete")
        @Access({ resource: "salary-lock", action: "delete" })
        async delete_salary_lock(@Param("lockId") lockId: string): Promise<ApiResponse> {
            const result = await this.salaryLockService.delete({ _id: lockId });
            return {message: "Salary lock deleted successfully", data: result};
        }
}
