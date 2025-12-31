import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { RoleService } from '../services/role.service';
import { CreateRoleDto } from '../dto/create-role.dto';
import { success, SuccessResponse } from 'src/utils/response.interface';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Access } from 'src/common/decorators/access.decorator';
import { IRole } from '../interfaces/role.interface';

@ApiBearerAuth("access-token")
@Controller('role')
export class RoleController {
    constructor(private readonly roleService: RoleService) { }

    @Access({ resource: "role", action: "create" })
    @Post("/create")
    async create_role(@Body() reqData: CreateRoleDto): Promise<SuccessResponse<IRole>> {
        const result = await this.roleService.create(reqData);
        return success("Role created successfully.", result);
    }

    @Access({ resource: "role", action: "read" })
    @Get("/read")
    async get_roles(): Promise<SuccessResponse<IRole[]>> {
        const roles = await this.roleService.readAll();
        return success("Data fetched successfully", roles);
    }

    @Access({ resource: "role", action: "read" })
    @Get("/:roleId/read")
    async get_role(@Param("roleId") roleId: string): Promise<SuccessResponse<IRole>> {
        const role = await this.roleService.readById({ _id: roleId });
        return success("Data fetched successfully", role)
    }

    @Access({ resource: "role", action: "update" })
    @Patch("/:roleId/update")
    async update_role(@Param("roleId") roleId: string, @Body() reqData: UpdateRoleDto): Promise<SuccessResponse<IRole>> {
        const result = await this.roleService.update({ _id: roleId }, reqData);
        return success("Role updated successfully", result);
    }

    @Access({ resource: "role", action: "delete" })
    @Delete("/:roleId/delete")
    async delete_role(@Param("roleId") roleId: string): Promise<SuccessResponse<IRole>> {
        const result = await this.roleService.delete({ _id: roleId });

        return success("Role deleted successfully", result);
    }
}
