import { Controller, Delete, Get, Param} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AdvanceDeductionService } from '../services/advance-deduction.service';
import { Access } from '@common/decorators';
import { success } from '@common/utils';
import { ISuccessResponse } from '@common/interfaces/payload.interface';
import { IAdvanceDeduction } from '../interface/advance-deduction.inteface';

@ApiBearerAuth("access-token")
@Controller('advance-deduction')
export class AdvanceDeductionController {
    constructor(private advanceDeductionService: AdvanceDeductionService) { }

    @Get("/read")
    @Access({ resource: "advance-deduction", action: "read" })
    async get_advance_deductions(): Promise<ISuccessResponse<IAdvanceDeduction[]>> {
        const result = await this.advanceDeductionService.readAll();
        return success("Date fetched successfully", result);
    }

    @Get("/:dId/read")
    @Access({ resource: "advance-deduction", action: "read" })
    async get_advance_deduction(@Param("dId") dId: string): Promise<ISuccessResponse<IAdvanceDeduction>> {
        const result = await this.advanceDeductionService.readOne({ _id: dId });
        return success("Date fetched successfully", result);
    }

    @Delete("/:dId")
    @Access({ resource: "advance-deduction", action: "delete" })
    async delete_bank_account(@Param("dId") dId: string): Promise<ISuccessResponse<IAdvanceDeduction>> {
        const result = await this.advanceDeductionService.delete({ _id: dId });
        return success("Bank accounts details deleted successfully", result);
    }
}
