import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Request } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ISuccessResponse } from '@common/interfaces/payload.interface';
import { success } from '@common/utils';
import { Access } from '@common/decorators';
import { VisaService } from '../services/visa.service';
import { CreateVisaDto } from '../dto/create-visa.dto';
import { UpdateVisaDto } from '../dto/update-visa.dto';
import { IVisa } from '../interfaces/visa.interface';

@ApiBearerAuth("access-token")
@Controller('visa')
export class VisaController {
    constructor(private readonly visaService: VisaService) { }

    @Post("/create")
    @Access({resource: "visa", action:"create"})
    async create_visa(@Req() req: any, @Body() reqData: CreateVisaDto, @Request() authUser: any): Promise<ISuccessResponse<IVisa>> {
        
        const result = await this.visaService.create(reqData, req.user);

        return success("Visa record created successfully", result);
    }

    @Get("/read")
    @Access({resource: "visa", action:"read"})
    async get_visas(): Promise<ISuccessResponse<IVisa[]>> {
        const visas = await this.visaService.readAll();
        return success("Data fetched successfully", visas);
    }

    @Get("/:visaId/read")
    @Access({resource: "visa", action:"read"})
    async get_visa(@Param("visaId") visaId: string): Promise<ISuccessResponse<IVisa>> {
        const visa = await this.visaService.readSingle({_id: visaId});
        return success("Data fetched successfully", visa)
    }

    @Patch("/:visaId/update")
    @Access({resource: "visa", action:"upadate"})
    async update_visa(@Param("visaId") visaId: string, @Body() reqData:UpdateVisaDto, @Request() authUser:any): Promise<ISuccessResponse<IVisa>> {
        const result = await this.visaService.update(
            {_id: visaId}, 
            reqData, 
            authUser
        );
        return success("Visa record updated successfully", result)
    }

    @Delete("/:visaId/delete")
    @Access({resource: "visa", action:"delete"})
    async delete_visa(@Param("visaId") visaId: string): Promise<ISuccessResponse<IVisa>> {
        const result = await this.visaService.delete({_id: visaId});
        return success("Visa record deleted successfully", result);
    }
}