import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Access } from '@common/decorators';
import { success } from '@common/utils';
import { ISuccessResponse } from '@common/interfaces/payload.interface';
import { EmployeeService } from '../services/employee.service';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { UpdateEmpoyeeDto } from '../dto/update-employee.dto';
import { IEmployee } from '../interfaces/employee.interface';
import type { JwtRequestPayload } from '@common/types/payload.type';
import { ApiResponse, SuccessInterceptor } from '@common/interceptors/success.interceptor';
import { CompanyGuard } from '@common/guards/company.guard';

@ApiBearerAuth('access-token')
@UseGuards(CompanyGuard)
@Controller('employee')
@UseInterceptors(SuccessInterceptor)
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) { }

    @Post("/create")
    @Access({ resource: "employee", action: "create" })
    async create_employee(@Req() req: any, @Body() reqData: CreateEmployeeDto): Promise<ApiResponse> {
        const user: JwtRequestPayload = req.user;
        const result = await this.employeeService.create({
            ...reqData,
            ...(user.company_id ? { company_id: user.company_id } : {}),

        }, req.user);

        return { message: "Emplyee created successfully", data: result }
    }

    @Get("/read")
    @Access({ resource: "employee", action: "read" })
    async get_employees(): Promise<ApiResponse> {
        const employees = await this.employeeService.readAll();
        return {data: employees};
    }

    @Get("/:empId/read")
    @Access({ resource: "employee", action: "read" })
    async get_employee(@Param("empId") empId: string): Promise<ISuccessResponse<IEmployee>> {
        const employee = await this.employeeService.readById({ _id: empId });
        return success("Data fetched successfully.", employee);
    }

    @Patch("/:empId/update")
    @Access({ resource: "employee", action: "update" })
    async update_employee(@Req() req: any, @Param("empId") empId: string, @Body() reqData: UpdateEmpoyeeDto): Promise<ISuccessResponse<IEmployee>> {

        const result = await this.employeeService.update(
            { _id: empId },
            reqData,
            req.user
        );

        return success("Employee updated successfully", result);
    }

    @Delete("/:empId/delete")
    @Access({ resource: "employee", action: "delete" })
    async delete_employee(@Param("empId") empId: string): Promise<ISuccessResponse<IEmployee>> {
        const result = await this.employeeService.delete({ _id: empId });

        return success("Employee deleted successfully.", result);
    }
}