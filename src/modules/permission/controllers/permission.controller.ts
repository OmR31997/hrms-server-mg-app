import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PermissionService } from '../services/permission.service';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { SuccessResponse } from 'src/utils/respons.interface';
import { UpdatePermissionDto } from '../dto/update-permission.dto';

@Controller('permission')
export class PermissionController {
    constructor(private readonly permissionService: PermissionService) { }

    @Post("/create")
    async create_permission(@Body() reqData: CreatePermissionDto): Promise<SuccessResponse> {
        return this.permissionService.create(reqData);
    }

    @Get("/read")
    async get_permissions(): Promise<SuccessResponse> {
        return this.permissionService.readAll();
    }

    @Get("/:permissionId/read")
    async get_permission(@Param("permissionId") permissionId: string): Promise<SuccessResponse> {
        return this.permissionService.readById({ _id: permissionId });
    }

    @Patch("/:permissionId/update")
    async update_permission(@Param("permissionId") permissionId: string, @Body() reqData: UpdatePermissionDto): Promise<SuccessResponse> {
        const keyVal = {
            _id: permissionId
        }

        return this.permissionService.update(keyVal, reqData);
    }

    @Delete("/:permissionId/delete")
    async delete_permission(@Param("permissionId") permissionId: string) {
        return this.permissionService.delete({ _id: permissionId });
    }
}
