import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { EmployeeService } from '../services/employee.service';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { success, SuccessResponse } from 'src/utils/response.interface';
import { UpdateEmpoyeeDto } from '../dto/update-employee.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { IEmployee } from '../interfaces/employee.interface';
import { Access } from 'src/common/decorators/access.decorator';

@ApiBearerAuth('access-token')
@Controller('employee')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) { }

    @Access({resource: "employee", action:"create"})
    @Post("/create")
    async create_employee(@Body() reqData: CreateEmployeeDto): Promise<SuccessResponse<IEmployee>> {
        const result = await this.employeeService.create(reqData);
        return success("Emplyee created successfully", result)
    }

    @Access({resource: "employee", action: "read"})
    @Get("/read")
    async get_employees(): Promise<SuccessResponse<IEmployee[]>> {
        const employees = await this.employeeService.readAll();
        return success("Data fetched successfully.", employees);
    }

    @Get("/:empId/read")
    async get_employee(@Param("empId") empId: string): Promise<SuccessResponse<IEmployee>> {
        const employee = await this.employeeService.readById({ _id: empId });
        return success("Data fetched successfully.", employee);
    }

    @Patch("/:empId/update")
    async update_employee(@Param("empId") empId: string, @Body() reqData: UpdateEmpoyeeDto): Promise<SuccessResponse<IEmployee>> {

        const result = await this.employeeService.update(
            { _id: empId },
            reqData, "user"
        );

        return success("Employee updated successfully", result);
    }

    @Delete("/:empId/delete")
    async delete_employee(@Param("empId") empId: string): Promise<SuccessResponse<IEmployee>> {
        const result = await this.employeeService.delete({ _id: empId });

        return success("Employee deleted successfully.", result);
    }
}