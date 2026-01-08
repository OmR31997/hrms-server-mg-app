import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { SystemJobService } from '../services/system-job.service';
import { ApiResponse, SuccessInterceptor } from '@common/interceptors/success.interceptor';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth("access-token")
@Controller('system-job')
@UseInterceptors(SuccessInterceptor)
export class SystemJobController {
    constructor(private readonly systemJobService:SystemJobService){}

    @Get("/read")
    async get_system_jobs(): Promise<ApiResponse> {
        const result = await this.systemJobService.readAll();
        return {data:result};
    }

    @Get("/:sId/read")
    async get_system_job(@Param("sId") sId: string): Promise<ApiResponse> {
        const result = await this.systemJobService.readOne({_id: sId});
        return {data:result};
    }

    @Get("/:sId/delete")
    async delete_system_job(@Param("sId") sId: string): Promise<ApiResponse> {
        const result = await this.systemJobService.delete({_id: sId});
        return {data:result};
    }
}
