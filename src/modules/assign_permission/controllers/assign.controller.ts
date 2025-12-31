import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AssignService } from '../services/assign.service';
import { CreateAssignPermissionDto } from '../dto/create-assign_permission.dto';
import { success, SuccessResponse } from 'src/utils/response.interface';
import { IAssignPermission } from '../interfaces/assign_permission.interface';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@Controller('assign')
export class AssignController {
    constructor(private readonly assignService: AssignService) { }

    @Post("/create")
    async create_assign(@Body() reqData: CreateAssignPermissionDto): Promise<SuccessResponse<IAssignPermission>> {
        const result = await this.assignService.create(reqData);
        return success("Permission assigned successfully", result);
    }

    @Get("/read")
    async get_assigned_permissions(): Promise<SuccessResponse<IAssignPermission[]>> {
        const result = await this.assignService.readAll();

        return success("Data fetched successfully", result)
    }

    @Get("/role/:roleId/read")
    async get_assigned_permission_by_role(@Param("roleId") roleId: string): Promise<SuccessResponse<IAssignPermission[]>> {
        const result =  await this.assignService.readByRole({ role_id: roleId });
        return success("Data fetched successfully", result)
    }

    @Get("/:assignId/read")
    async get_assigned_permission(@Param("assignId") assignId: string): Promise<SuccessResponse<IAssignPermission>> {
        const result = await this.assignService.readSingle({ _id: assignId });
        return success("Data fetched successfully", result)
    }

    @Delete("/:assignId/delete")
    async drop_permission(@Param("assignId") assignId: string): Promise<SuccessResponse<IAssignPermission>> {
        const result = await this.assignService.delete({ _id: assignId });
        return success("Permission assign dropped successfully", result);
    }
}
