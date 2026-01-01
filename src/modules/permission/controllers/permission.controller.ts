import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Access } from '@common/decorators';
import { ISuccessResponse } from '@common/interfaces/payload.interface';
import { success } from '@common/utils';
import { PermissionService } from '../services/permission.service';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { UpdatePermissionDto } from '../dto/update-permission.dto';
import { IPermission } from '../interfaces/permission.interface';

@ApiBearerAuth('access-token')
@Controller('permission')
export class PermissionController {
    constructor(private readonly permissionService: PermissionService) { }

    @Post("/create")
    @Access({resource: "permission", action:"create"})
    async create_permission(@Body() reqData: CreatePermissionDto): Promise<ISuccessResponse<IPermission>> {
        const permission = await this.permissionService.create(reqData);
        return success("Permission created successfully.", permission)
    }

    @Get("/read")
    @Access({resource: "permission", action:"read"})
    async get_permissions(): Promise<ISuccessResponse<IPermission[]>> {
        const permissions = await this.permissionService.readAll();
        return success("Data fetched successfully", permissions)
    }

    @Get("/:permissionId/read")
    @Access({resource: "permission", action:"read"})
    async get_permission(@Param("permissionId") permissionId: string): Promise<ISuccessResponse<IPermission>> {
        const permission = await this.permissionService.readById({ _id: permissionId });
        return success("Data fetched successfully", permission)
    }

    @Patch("/:permissionId/update")
    @Access({resource: "permission", action:"update"})
    async update_permission(@Param("permissionId") permissionId: string, @Body() reqData: UpdatePermissionDto): Promise<ISuccessResponse<IPermission>> {

        const result = await this.permissionService.update({ _id: permissionId }, reqData);
        return success("Permission updated successfully", result);
    }

    @Delete("/:permissionId/delete")
    @Access({resource: "permission", action:"delete"})
    async delete_permission(@Param("permissionId") permissionId: string): Promise<ISuccessResponse<IPermission>> {
        const result = await this.permissionService.delete({ _id: permissionId });
        return success("Permission deleted successfully", result);
    }
}
