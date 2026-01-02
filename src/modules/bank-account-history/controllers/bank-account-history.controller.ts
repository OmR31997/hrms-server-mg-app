import { Controller, Delete, Get, Param } from '@nestjs/common';
import { BankAccountHistoryService } from '../services/bank-account-history.service';
import { Access } from '@common/decorators';
import { ISuccessResponse } from '@common/interfaces/payload.interface';
import { IBankAccountHistory } from '../interfaces/bank-account-history.interface';
import { success } from '@common/utils';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth("access-token")
@Controller('bank-account-history')
export class BankAccountHistoryController {
    constructor(private readonly bankAccountHistoryService: BankAccountHistoryService) { }

    @Get("/read")
    @Access({ resource: "bank-history-account", action: "read" })
    async get_bank_accounts(): Promise<ISuccessResponse<IBankAccountHistory[]>> {
        const result = await this.bankAccountHistoryService.readAll();
        return success("Date fetched successfully", result);
    }

    @Get("/:bankId/read")
    @Access({ resource: "bank-history-account", action: "read" })
    async get_bank_account(@Param("hId") hId: string): Promise<ISuccessResponse<IBankAccountHistory>> {
        const result = await this.bankAccountHistoryService.readOne({ _id: hId });
        return success("Date fetched successfully", result);
    }

    @Delete("/:hId")
    @Access({ resource: "bank-histoy-account", action: "delete" })
    async delete_bank_account(@Param("hId") hId: string): Promise<ISuccessResponse<IBankAccountHistory>> {
        const result = await this.bankAccountHistoryService.delete({ _id: hId });
        return success("Bank accounts details deleted successfully", result);
    }

}
