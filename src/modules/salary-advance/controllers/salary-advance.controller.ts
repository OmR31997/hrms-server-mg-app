import { Body, Controller, Delete, Get, Param, Patch, Post, Request } from '@nestjs/common';
import { SalaryAdvanceService } from '../services/salary-advance.service';
import { CreateSalaryAdvanceDto } from '../dto/create-salary-advance.dto';
import { ISalaryAdvance } from '../interfaces/salary-advance.interface';
import { ISuccessResponse } from '@common/interfaces/payload.interface';
import { success } from '@common/utils';
import { UpdateSalaryAdvanceDto } from '../dto/update-salary-advance.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Access } from '@common/decorators';
import type { JwtRequestPayload } from '@common/types/payload.type';

@ApiBearerAuth("access-token")
@Controller('salary-advance')
export class SalaryAdvanceController {
    constructor(private salaryAdvanceService: SalaryAdvanceService) { }

    @Post("/create")
    @Access({ resource: "advance-salary", action: "create" })
    async create_advance_salary(@Request() user: JwtRequestPayload, @Body() reqData: CreateSalaryAdvanceDto): Promise<ISuccessResponse<ISalaryAdvance>> {
        const result = await this.salaryAdvanceService.create(reqData, user);
        return success("Advance salary has been done successfully", result);
    }

    @Get("/read")
    @Access({ resource: "advance-salary", action: "read" })
    async get_advanced_salaries(): Promise<ISuccessResponse<ISalaryAdvance[]>> {
        const result = await this.salaryAdvanceService.readAll();
        return success("Data fetched successfully", result);
    }

    @Get("/:sId/read")
    @Access({ resource: "advance-salary", action: "read" })
    async get_advanced_salary(@Param("sId") sID: string): Promise<ISuccessResponse<ISalaryAdvance>> {
        const result = await this.salaryAdvanceService.readOne({ _id: sID });
        return success("Data fetched successfully", result);
    }

    @Patch("/:sId/update")
    @Access({ resource: "advance-salary", action: "update" })
    async update_advance_salary(@Request() user: JwtRequestPayload, @Param("sId") sId: string, @Body() reqData: UpdateSalaryAdvanceDto): Promise<ISuccessResponse<ISalaryAdvance>> {
        const result = await this.salaryAdvanceService.update({ _id: sId }, reqData, user.role_id);
        return success("Advance salary has been updated successfully", result);
    }

    @Delete("/:sId/delete")
    @Access({ resource: "advance-salary", action: "delete" })
    async delete_advance_salary(@Param("sId") sId: string): Promise<ISuccessResponse<ISalaryAdvance>> {
        const result = await this.salaryAdvanceService.delete({ _id: sId });
        return success("Advance salary has been deleted successfully", result);
    }
}
