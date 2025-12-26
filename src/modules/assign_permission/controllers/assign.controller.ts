import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AssignService } from '../services/assign.service';
import { CreateAssignPermissionDto } from '../dto/create-assign_permission.dto';
import { SuccessResponse } from 'src/utils/respons.interface';
import { UpadateAssignPermissionsDto } from '../dto/update-assign_permission.dto';

@Controller('assign')
export class AssignController {
    constructor(private readonly assignService: AssignService) { }

    @Post("/create")
    async create_assign(@Body() reqData: CreateAssignPermissionDto): Promise<SuccessResponse> {
        return this.assignService.createOrUpdate(reqData);
    }

    @Patch("/:assignId/add")
    async add_assign(@Param("assignId") assignId: string, @Body() reqData: UpadateAssignPermissionsDto): Promise<SuccessResponse> {
        return this.assignService.add({ _id: assignId }, reqData);
    }

    @Patch("/:assignId/drop")
    async drop_assign(@Param("assignId") assignId: string, @Body() reqData: UpadateAssignPermissionsDto): Promise<SuccessResponse> {
        return this.assignService.drop({ _id: assignId }, reqData);
    }

    @Get("/read")
    async get_assigned_permissions(): Promise<SuccessResponse> {
        return this.assignService.readAll();
    }

    @Get("/:assignId/read")
    async get_assigned_permission(@Param("assignId") assignId: string): Promise<SuccessResponse> {
        return this.assignService.readById({ _id: assignId });
    }

    @Get("/role/:roleId/read")
    async get_assigned_permission_by_role(@Param("roleId") roleId: string): Promise<SuccessResponse> {
        return this.assignService.readById({ role_id: roleId });
    }
}
