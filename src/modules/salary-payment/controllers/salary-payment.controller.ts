import { ApiResponse, SuccessInterceptor } from '@common/interceptors/success.interceptor';
import { Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { SalaryPaymentService } from '../services/salary-payment.service';
import { CreateSalaryPaymentDto } from '../dto/create-salary-payment.dto';
import { UpdateSalaryPaymentDto } from '../dto/update-salary-payment.dto';

@ApiBearerAuth("access-token")
@Controller('salary-payment')
@UseInterceptors(SuccessInterceptor)
export class SalaryPaymentController {
    constructor(private readonly salaryPaymentService: SalaryPaymentService){}

    @Post("/create")
    async create_salary_payment(@Body() reqData: CreateSalaryPaymentDto): Promise<ApiResponse> {
        const result = await this.salaryPaymentService.create(reqData); 
        return {message: "Salary paid successfully", data: result}   
    }

    @Get("/read")
    async get_salaried_payments(): Promise<ApiResponse> {
        const result = await this.salaryPaymentService.readAll();
        return {data: result}
    }

    @Get("/:pId/read")
    async get_salaried_payment(@Param("pId") pId: string): Promise<ApiResponse> {
        const result = await this.salaryPaymentService.readOne({_id: pId});
        return {data: result};
    }

    @Patch("/:pId/update")
    async update_salary_payment(@Param("pId") pId:string, @Body() reqData:UpdateSalaryPaymentDto): Promise<ApiResponse> {
        const result = await this.salaryPaymentService.update({_id: pId}, reqData);
        return {message: "Salary payment update successfully", data: result}
    }

    @Delete("/:pId/delete")
    async delete_salary_payment(@Param("pId") pId:string): Promise<ApiResponse> {
        const result = await this.salaryPaymentService.delete({_id: pId});
        return {message: "Salary payment update successfully", data: result};
    }
}
