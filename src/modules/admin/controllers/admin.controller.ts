import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AdminService } from '../services/admin.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Access } from '@common/decorators';
import { ApiResponse, SuccessInterceptor } from '@common/interceptors/success.interceptor';

@ApiBearerAuth('access-token')
@Controller('admin')
@UseInterceptors(SuccessInterceptor)
export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    @Access({ resource: "admin", action: "read" })
    @Get("/read")
    async get_admin(): Promise<ApiResponse> {
        const admin = await this.adminService.readAll();
        return {data: admin};
    }
}
