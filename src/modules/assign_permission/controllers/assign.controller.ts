import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AssignService } from '../services/assign.service';
import { CreateAssignPermissionDto } from '../dto/create-assign_permission.dto';
import { IAssignPermission } from '../interfaces/assign_permission.interface';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ISuccessResponse } from '@common/interfaces/payload.interface';
import { success } from '@common/utils';
import { Access } from '@common/decorators';

@ApiBearerAuth('access-token')
@Controller('assign')
export class AssignController {
    constructor(private readonly assignService: AssignService) { }

    @Post("/create")
    @Access({resource: "assign-permission", action: "create"})
    async create_assign(@Body() reqData: CreateAssignPermissionDto): Promise<ISuccessResponse<IAssignPermission>> {
        const result = await this.assignService.create(reqData);
        return success("Permission assigned successfully", result);
    }

    @Get("/read")
    @Access({resource: "assign-permission", action: "read"})
    async get_assigned_permissions(): Promise<ISuccessResponse<IAssignPermission[]>> {
        const result = await this.assignService.readAll();

        return success("Data fetched successfully", result)
    }

    @Get("/role/:roleId/read")
    @Access({resource: "assign-permission", action: "read"})
    async get_assigned_permission_by_role(@Param("roleId") roleId: string): Promise<ISuccessResponse<IAssignPermission[]>> {
        const result =  await this.assignService.readByRole({ role_id: roleId });
        return success("Data fetched successfully", result)
    }

    @Get("/:assignId/read")
    @Access({resource: "assign-permission", action: "read"})
    async get_assigned_permission(@Param("assignId") assignId: string): Promise<ISuccessResponse<IAssignPermission>> {
        const result = await this.assignService.readSingle({ _id: assignId });
        return success("Data fetched successfully", result)
    }

    @Delete("/:assignId/delete")
    @Access({resource: "assign-permission", action: "delete"})
    async drop_permission(@Param("assignId") assignId: string): Promise<ISuccessResponse<IAssignPermission>> {
        const result = await this.assignService.delete({ _id: assignId });
        return success("Permission assign dropped successfully", result);
    }
}
