import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AdvanceHistoryService } from '../services/advance-history.service';
import { Access } from '@common/decorators';
import { ISuccessResponse } from '@common/interfaces/payload.interface';
import { IAdvanceDeduction } from '@module/advance-deduction/interface/advance-deduction.inteface';
import { success } from '@common/utils';
import { IAdvanceHistory } from '../interfaces/advance-history.interface';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth("access-token")
@Controller('advance-history')
export class AdvanceHistoryController {
    constructor(private advanceHistoryService: AdvanceHistoryService) { }

    @Get("/read")
    @Access({ resource: "advance-deduction", action: "read" })
    async get_advance_deductions(): Promise<ISuccessResponse<IAdvanceHistory[]>> {
        const result = await this.advanceHistoryService.readAll();
        return success("Date fetched successfully", result);
    }

    @Get("/:dId/read")
    @Access({ resource: "advance-deduction", action: "read" })
    async get_advance_deduction(@Param("dId") dId: string): Promise<ISuccessResponse<IAdvanceHistory>> {
        const result = await this.advanceHistoryService.readOne({ _id: dId });
        return success("Date fetched successfully", result);
    }

    @Delete("/:dId")
    @Access({ resource: "advance-deduction", action: "delete" })
    async delete_bank_account(@Param("dId") dId: string): Promise<ISuccessResponse<IAdvanceHistory>> {
        const result = await this.advanceHistoryService.delete({ _id: dId });
        return success("Bank accounts details deleted successfully", result);
    }
}
