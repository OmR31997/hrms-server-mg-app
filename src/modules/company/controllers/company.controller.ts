import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CompanyService } from '../services/company.service';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { SuccessResponse } from 'src/utils/respons.interface';
import { UpadateCompanyDto } from '../dto/update-company.dto';

@Controller('company')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) { };

    @Post("/create")
    async create_company(@Body() reqData: CreateCompanyDto): Promise<SuccessResponse> {
        return this.companyService.create(reqData);
    }

    @Get("/read")
    async get_companies(): Promise<SuccessResponse> {
        return this.companyService.readAll();
    }

    @Get("/:companyId/read")
    async get_company_detail(@Param("companyId") companyId: string): Promise<SuccessResponse> {
        return this.companyService.readById({ _id: companyId });
    }

    @Patch("/:companyId/update")
    async update_company(@Param("companyId") companyId: string, @Body() reqData: UpadateCompanyDto): Promise<SuccessResponse> {
        const keyVal = {
            _id: companyId
        }

        return this.companyService.update(keyVal, reqData);
    }

    @Delete("/:companyId/delete")
    async delete_company(@Param("companyId") companyId: string): Promise<SuccessResponse> {
        return this.companyService.delete({ _id: companyId });
    }
}
