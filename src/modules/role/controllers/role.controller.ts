import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Access, Public } from '@common/decorators';
import { ISuccessResponse } from '@common/interfaces/payload.interface';
import { success } from '@common/utils';
import { RoleService } from '../services/role.service';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { IRole } from '../interfaces/role.interface';

@ApiBearerAuth("access-token")
@Controller('role')
export class RoleController {
    constructor(private readonly roleService: RoleService) { }

    @Post("/create")
    @Access({resource: "role", action:"create"})
    async create_role(@Body() reqData: CreateRoleDto): Promise<ISuccessResponse<IRole>> {
        const result = await this.roleService.create(reqData);
        return success("Role created successfully.", result);
    }

    @Get("/read")
    @Access({resource: "role", action:"read"})
    async get_roles(): Promise<ISuccessResponse<IRole[]>> {
        const roles = await this.roleService.readAll();
        return success("Data fetched successfully", roles);
    }

    @Get("/:roleId/read")
    @Access({resource: "role", action:"read"})
    async get_role(@Param("roleId") roleId: string): Promise<ISuccessResponse<IRole>> {
        const role = await this.roleService.readById({ _id: roleId });
        return success("Data fetched successfully", role)
    }

    @Patch("/:roleId/update")
    @Access({resource: "role", action:"update"})
    async update_role(@Param("roleId") roleId: string, @Body() reqData: UpdateRoleDto): Promise<ISuccessResponse<IRole>> {
        const result = await this.roleService.update({ _id: roleId }, reqData);
        return success("Role updated successfully", result);
    }

    @Delete("/:roleId/delete")
    @Access({resource: "role", action:"delete"})
    async delete_role(@Param("roleId") roleId: string): Promise<ISuccessResponse<IRole>> {
        const result = await this.roleService.delete({ _id: roleId });

        return success("Role deleted successfully", result);
    }
}
