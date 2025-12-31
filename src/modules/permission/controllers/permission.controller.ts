import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PermissionService } from '../services/permission.service';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { success, SuccessResponse } from 'src/utils/response.interface';
import { UpdatePermissionDto } from '../dto/update-permission.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { IPermission } from '../interfaces/permission.interface';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@Controller('permission')
export class PermissionController {
    constructor(private readonly permissionService: PermissionService) { }

    @Public()
    @Post("/create")
    async create_permission(@Body() reqData: CreatePermissionDto): Promise<SuccessResponse<IPermission>> {
        const permission = await this.permissionService.create(reqData);
        return success("Permission created successfully.", permission)
    }

    @Get("/read")
    async get_permissions(): Promise<SuccessResponse<IPermission[]>> {
        const permissions = await this.permissionService.readAll();
        return success("Data fetched successfully", permissions)
    }

    @Get("/:permissionId/read")
    async get_permission(@Param("permissionId") permissionId: string): Promise<SuccessResponse<IPermission>> {
        const permission = await this.permissionService.readById({ _id: permissionId });
        return success("Data fetched successfully", permission)
    }

    @Patch("/:permissionId/update")
    async update_permission(@Param("permissionId") permissionId: string, @Body() reqData: UpdatePermissionDto): Promise<SuccessResponse<IPermission>> {

        const result = await this.permissionService.update({ _id: permissionId }, reqData);
        return success("Permission updated successfully", result);
    }

    @Delete("/:permissionId/delete")
    async delete_permission(@Param("permissionId") permissionId: string): Promise<SuccessResponse<IPermission>> {
        const result = await this.permissionService.delete({ _id: permissionId });
        return success("Permission deleted successfully", result);
    }
}
