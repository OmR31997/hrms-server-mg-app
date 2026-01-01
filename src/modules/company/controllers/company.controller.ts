import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CompanyService } from '../services/company.service';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpadateCompanyDto } from '../dto/update-company.dto';
import { ICompany } from '../interfaces/company.interface';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Access } from '@common/decorators';
import { ISuccessResponse } from '@common/interfaces/payload.interface';
import { success } from '@common/utils';

@ApiBearerAuth('access-token')
@Controller('company')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) { };

    @Post("/create")
    @Access({ resource: "company", action: "create" })
    async create_company(@Body() reqData: CreateCompanyDto): Promise<ISuccessResponse<ICompany>> {
        const result = await this.companyService.create(reqData);
        return success("Company created successfully.", result);
    }

    @Get("/read")
    @Access({ resource: "company", action: "read" })
    async get_companies(): Promise<ISuccessResponse<ICompany[]>> {
        const result = await this.companyService.readAll();
        return success("Data fetched successfully.", result)
    }

    @Get("/:companyId/read")
    @Access({ resource: "company", action: "read" })
    async get_company_detail(@Param("companyId") companyId: string): Promise<ISuccessResponse<ICompany>> {
        const company = await this.companyService.readOne({ _id: companyId });
        return success("Data fetched successfully.", company)
    }

    @Patch("/:companyId/update")
    @Access({ resource: "company", action: "update" })
    async update_company(@Param("companyId") companyId: string, @Body() reqData: UpadateCompanyDto): Promise<ISuccessResponse<ICompany>> {
        const result = await this.companyService.update({_id: companyId}, reqData);
        return success("Data fetched successfully.", result);
    }

    @Delete("/:companyId/delete")
    @Access({ resource: "company", action: "delete" })
    async delete_company(@Param("companyId") companyId: string): Promise<ISuccessResponse<ICompany>> {
        const result = await this.companyService.delete({ _id: companyId });
        return success("Data fetched successfully.", result);
    }
}
