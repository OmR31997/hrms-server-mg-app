import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BankAccountService } from '../services/bank-account.service';
import { success } from '@common/utils';
import { ISuccessResponse } from '@common/interfaces/payload.interface';
import { IBankAccount } from '../interfaces/bank-account.interface';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { Access } from '@common/decorators';
import { UpadateBankAccountDto } from '../dto/update-branch.dto';

@ApiBearerAuth('access-token')
@Controller('bank-account')
export class BankAccountController {
    constructor(private bankAccountService: BankAccountService) { }

    @Post("/create")
    @Access({ resource: "bank-account", action: "create" })
    async create_bank_account(@Body() reqDate: CreateBankAccountDto): Promise<ISuccessResponse<IBankAccount>> {
        const result = await this.bankAccountService.create(reqDate);
        return success("Bank details has been submitted", result);
    }

    @Get("/read")
    @Access({ resource: "bank-account", action: "read" })
    async get_bank_accounts(): Promise<ISuccessResponse<IBankAccount[]>> {
        const result = await this.bankAccountService.readAll();
        return success("Date fetched successfully", result);
    }

    @Get("/:accno/read")
    @Access({resource: "bank-account", action: "read"})
    async get_bank_account(@Param("accno") accno: string): Promise<ISuccessResponse<IBankAccount>> {
        const result = await this.bankAccountService.readOne({account_no: accno});
        return success("Date fetched successfully", result);
    }

    @Patch("/:employeeId/update")
    @Access({resource: "bank-account", action: "update"})
    async update_bank_account(@Param("employeeId") employeeId: string, @Body() reqData:UpadateBankAccountDto){
        const result = await this.bankAccountService.update(
            {employee_id: employeeId},
            reqData
        );

        return success("Bank account details updated successfully", result);
    }

    @Delete("/:bankId")
    @Access({resource: "bank-account", action: "delete"})
    async delete_bank_account(@Param("bankId") bankId: string): Promise<ISuccessResponse<IBankAccount>> {
        const result = await this.bankAccountService.delete({_id: bankId});
        return success("Bank accounts details deleted successfully", result);
    }
}
