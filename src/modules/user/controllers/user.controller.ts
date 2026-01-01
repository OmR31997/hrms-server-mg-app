import { Body, Controller, Delete, Get, Param, Patch, Post, Request } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Access } from '@common/decorators';
import { ISuccessResponse } from '@common/interfaces/payload.interface';
import { success } from '@common/utils';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpadateUserDto } from '../dto/update-user.dto';
import { IUser } from '../interfaces/user.interface';

@ApiBearerAuth("access-token")
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { };

    @Post("/create")
    @Access({resource:"user", action: "create"})
    async create_user(@Body() reqData: CreateUserDto): Promise<ISuccessResponse<IUser>> {
        const result = await this.userService.create(reqData);
        return success("User created successfully", result);
    }

    @Get("/read")
    @Access({resource: "user", action: "read"})
    async get_users(): Promise<ISuccessResponse<IUser[]>> {
        const users = await this.userService.readAll();
        return success("Data fetched successfully", users);
    }

    @Get("/:id/read")
    @Access({resource: "user", action: "read"})
    async get_user(@Param("id") id: string): Promise<ISuccessResponse<IUser>> {
        const user = await this.userService.readSingle({ _id: id });
        return success("Data fetched successfully", user);
    }

    @Get("me")
    @Access({resource: "user", action: "read"})
    async get_me(@Request() req: any): Promise<ISuccessResponse<IUser>> {
        const user = await this.userService.readSingle({ _id: req.user.id });
        return success("Data fetched successfully", user);
    }

    @Patch("/:id/update")
    @Access({resource: "user", action: "update"})
    async update_user(@Param("id") id: string, @Body() reqData: UpadateUserDto): Promise<ISuccessResponse> {
        const result = await this.userService.update({_id: id}, reqData);
        return success("User updated successfully", result);
    }

    @Delete("/:id/delete")
    @Access({resource: "user", action: "delete"})
    async delete_user(@Param("id") id: string): Promise<ISuccessResponse<IUser>> {
        const result = await this.userService.delete({ _id: id });

        return success("User deleted successfully", result);
    }
}
