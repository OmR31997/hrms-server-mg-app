import { Body, Controller, Delete, Get, Param, Patch, Post, Request } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpadateUserDto } from '../dto/update-user.dto';
import { success, SuccessResponse } from 'src/utils/response.interface';
import { IUser } from '../interfaces/user.interface';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Access } from 'src/common/decorators/access.decorator';

@ApiBearerAuth("access-token")
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { };

    @Access({resource:"user", action: "create"})
    @Post("/create")
    async create_user(@Body() reqData: CreateUserDto): Promise<SuccessResponse<IUser>> {
        const result = await this.userService.create(reqData);
        return success("User created successfully", result);
    }

    @Access({resource: "user", action: "read"})
    @Get("/read")
    async get_users(): Promise<SuccessResponse<IUser[]>> {
        const users = await this.userService.readAll();
        return success("Data fetched successfully", users);
    }

    @Access({resource: "user", action: "read"})
    @Get("/:id/read")
    async get_user(@Param("id") id: string): Promise<SuccessResponse<IUser>> {
        const user = await this.userService.readSingle({ _id: id });
        return success("Data fetched successfully", user);
    }

    @Access({resource: "user", action: "read"})
    @Get("me")
    async get_me(@Request() req: any): Promise<SuccessResponse<IUser>> {
        const user = await this.userService.readSingle({ _id: req.user.id });
        return success("Data fetched successfully", user);
    }

    @Access({resource: "user", action: "update"})
    @Patch("/:id/update")
    async update_user(@Param("id") id: string, @Body() reqData: UpadateUserDto): Promise<SuccessResponse> {
        const result = await this.userService.update({_id: id}, reqData);
        return success("User updated successfully", result);
    }

    @Access({resource: "user", action: "delete"})
    @Delete("/:id/delete")
    async delete_user(@Param("id") id: string): Promise<SuccessResponse<IUser>> {
        const result = await this.userService.delete({ _id: id });

        return success("User deleted successfully", result);
    }
}
