import { Body, Controller, Delete, Get, Param, Patch, Post, Request } from '@nestjs/common';
import { RoleService } from '../services/role.service';
import { CreateRoleDto } from '../dto/create-role.dto';
import { SuccessResponse } from 'src/utils/respons.interface';
import { JwtDto } from 'src/common/jwt.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';

@Controller('role')
export class RoleController {
    constructor(private readonly roleService: RoleService) { }

    @Post("/create")
    async create_role(@Body() reqData: CreateRoleDto): Promise<SuccessResponse> {
        return this.roleService.create(reqData);
    }

    @Get("/read")
    async get_roles(): Promise<SuccessResponse> {
        return this.roleService.readAll();
    }

    @Get("/:roleId/read")
    async get_role(@Param("roleId") roleId: string): Promise<SuccessResponse> {
        return this.roleService.readById({ _id: roleId });
    }

    @Patch("/:roleId/update")
    async update_role(@Param("roleId") roleId: string, @Body() reqData: UpdateRoleDto): Promise<SuccessResponse> {
        return this.roleService.update({_id: roleId}, reqData);
    }

    @Delete("/:roleId/delete")
    async delete_role(@Param("roleId") roleId: string): Promise<SuccessResponse> {
        return this.roleService.delete({ _id: roleId });
    }
}
