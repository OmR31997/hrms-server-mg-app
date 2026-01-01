import { Controller, Get } from '@nestjs/common';
import { AdminService } from '../services/admin.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { IAdmin } from '../interfaces/admin.inteface';
import { Access } from '@common/decorators';
import { ISuccessResponse } from '@common/interfaces/payload.interface';
import { success } from '@common/utils';

@ApiBearerAuth('access-token')
@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    @Access({ resource: "admin", action: "read" })
    @Get("/read")
    async get_admin(): Promise<ISuccessResponse<IAdmin[]>> {
        const admin = await this.adminService.readAll();
        return success("Data fetched successfully", admin);
    }
}
