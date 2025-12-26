import { Body, Controller, Delete, Get, Param, Patch, Post, Request } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpadateUserDto } from '../dto/update-user.dto';
import { SuccessResponse } from 'src/utils/respons.interface';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { };

    @Post("/create")
    async create_user(@Body() reqData: CreateUserDto): Promise<SuccessResponse> {
        return this.userService.create(reqData);
    }

    @Get("/read")
    async get_users(): Promise<SuccessResponse> {
        return this.userService.readAll();
    }

    @Get("/:id/read")
    async get_user(@Param("id") id: string): Promise<SuccessResponse> {
        return this.userService.readById({ _id: id });
    }

    @Get("me")
    async get_me(@Request() req: any): Promise<SuccessResponse> {
        return this.userService.readById({ _id: req.user.id });
    }

    @Patch("/:id/update")
    async update_user(@Param("id") id: string, @Body() reqData: UpadateUserDto): Promise<SuccessResponse> {
        return this.userService.update({_id: id}, reqData);
    }

    @Delete("/:id/delete")
    async delete_user(@Param("id") id: string): Promise<SuccessResponse> {
        return this.userService.delete({ _id: id });
    }
}
