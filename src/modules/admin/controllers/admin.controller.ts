import { Controller, Get} from '@nestjs/common';
import { AdminService } from '../services/admin.service';
import { success, SuccessResponse } from 'src/utils/response.interface';
import { Access } from 'src/common/decorators/access.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { IAdmin } from '../interfaces/admin.inteface';

@ApiBearerAuth('access-token')
@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    @Access({action: "read", resource: "admin"})
    @Get("/read")
    async get_admin(): Promise<SuccessResponse<IAdmin[]>> {
        const admin = await this.adminService.readAll();
        return success("Data fetched successfully", admin);
    }
}
