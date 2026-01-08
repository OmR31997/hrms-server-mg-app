import { Access } from '@common/decorators';
import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseInterceptors } from '@nestjs/common';
import { LeaveService } from '../services/leave.service';
import { CreateLeaveDto } from '../dto/create-leave.dto';
import { ApiResponse, SuccessInterceptor } from '@common/interceptors/success.interceptor';
import { UpdateLeaveDto } from '../dto/update-leave.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth("access-token")
@Controller('leave')
@UseInterceptors(SuccessInterceptor)
export class LeaveController {
    constructor(private readonly leaveService: LeaveService) { }

    @Post("/create")
    @Access({ resource: "leave", action: "create" })
    async create_leave(@Req() req: any, @Body() reqData: CreateLeaveDto): Promise<ApiResponse> {

        const result = await this.leaveService.create(reqData, req.user);
        return {data: result}
    }

    @Get("/read")
    @Access({ resource: "leave", action: "read" })
    async get_leaves(): Promise<ApiResponse> {
        const result = await this.leaveService.readAll();

        return { data: result };
    }

    @Get("/:empId/read")
    @Access({ resource: "leave", action: "read" })
    async get_leave(@Param("leaveId") leaveId: string): Promise<ApiResponse> {
        const leave = await this.leaveService.readOne({ _id: leaveId });

        return {data: leave}
    }

    @Patch("/:empId/update")
    @Access({ resource: "leave", action: "update" })
    async update_leave(@Req() req: any, @Param("empId") empId: string, @Body() reqData: UpdateLeaveDto): Promise<ApiResponse> {

        const result = await this.leaveService.update(
            { _id: empId },
            reqData,
            req.user
        );

        return {data: result};
    }

    @Delete("/:empId/delete")
    @Access({ resource: "leave", action: "delete" })
    async delete_leave(@Param("empId") empId: string): Promise<ApiResponse> {
        const result = await this.leaveService.delete({ _id: empId });

        return {data: result};
    }
}
