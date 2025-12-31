import { Body, Controller, Delete, Get, Param, Patch, Post, Request } from '@nestjs/common';
import { VisaService } from '../services/visa.service';
import { success, SuccessResponse } from 'src/utils/response.interface';
import { CreateVisaDto } from '../dto/create-visa.dto';
import { JwtDto } from 'src/common/jwt.dto';
import { UpdateVisaDto } from '../dto/update-visa.dto';
import { IVisa } from '../interfaces/visa.interface';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth("access-token")
@Controller('visa')
export class VisaController {
    constructor(private readonly visaService: VisaService) { }

    @Post("/create")
    async create_visa(@Body() reqData: CreateVisaDto, @Request() authUser: JwtDto): Promise<SuccessResponse<IVisa>> {
        
        const result = await this.visaService.create({
            ...reqData,
            assigned_manager_id: authUser.id || "system"
        });

        return success("Visa record created successfully", result);
    }

    @Get("/read")
    async get_visas(): Promise<SuccessResponse<IVisa[]>> {
        const visas = await this.visaService.readAll();
        return success("Data fetched successfully", visas);
    }

    @Get("/:visaId/read")
    async get_visa(@Param("visaId") visaId: string): Promise<SuccessResponse<IVisa>> {
        const visa = await this.visaService.readSingle({_id: visaId});
        return success("Data fetched successfully", visa)
    }

    @Patch("/:visaId/update")
    async update_visa(@Param("visaId") visaId: string, @Body() reqData:UpdateVisaDto, @Request() authUser:JwtDto): Promise<SuccessResponse<IVisa>> {
        const result = await this.visaService.update(
            {_id: visaId}, 
            reqData, 
            authUser
        );
        return success("Visa record updated successfully", result)
    }

    @Delete("/:visaId/delete")
    async delete_visa(@Param("visaId") visaId: string): Promise<SuccessResponse<IVisa>> {
        const result = await this.visaService.delete({_id: visaId});
        return success("Visa record deleted successfully", result);
    }
}