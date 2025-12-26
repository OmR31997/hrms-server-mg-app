import { Body, Controller, Delete, Get, Param, Patch, Post, Request } from '@nestjs/common';
import { EmployeeService } from '../services/employee.service';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { SuccessResponse } from 'src/utils/respons.interface';
import { UpdateEmpoyeeDto } from '../dto/update-employee.dto';
import { JwtDto } from 'src/common/jwt.dto';

@Controller('employee')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) { }

    @Post("/create")
    async create_employee(@Body() reqData: CreateEmployeeDto): Promise<SuccessResponse> {
        return this.employeeService.create(reqData);
    }

    @Get("/read")
    async get_employees(): Promise<SuccessResponse> {
        return this.employeeService.readAll();
    }

    @Get("/:empId")
    async get_employee(@Param("empId") empId: string): Promise<SuccessResponse> {
        return this.employeeService.readById({ _id: empId })
    }

    @Patch("/:empId/update")
    async update_employee(@Param("empId") empId: string, @Body() reqData: UpdateEmpoyeeDto): Promise<SuccessResponse> {
        return this.employeeService.update({ _id: empId }, reqData, "user");
    }

    @Delete("/:empId/delete")
    async delete_employee(@Param("empId") empId: string): Promise<SuccessResponse> {
        return this.employeeService.delete({ _id: empId });
    }
}
