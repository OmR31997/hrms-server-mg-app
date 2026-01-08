import { Controller, Delete, Get, Param, UseInterceptors } from '@nestjs/common';
import { LeaveHistoryService } from '../services/leave-history.service';
import { Access } from '@common/decorators';
import { ApiResponse, SuccessInterceptor } from '@common/interceptors/success.interceptor';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth("access-token")
@Controller('leave-history')
@UseInterceptors(SuccessInterceptor)
export class LeaveHistoryController {
    constructor(private readonly leaveHistoryService: LeaveHistoryService) { }

    @Get("/read")
    @Access({ resource: "leave-history", action: "read" })
    async get_leave_histories(): Promise<ApiResponse> {
        const result = await this.leaveHistoryService.readAll();

        return { data: result };
    }

    @Get("/:empId/read")
    @Access({ resource: "leave-history", action: "read" })
    async get_leave_history(@Param("hId") hId: string): Promise<ApiResponse> {
        const leave = await this.leaveHistoryService.readOne({ _id: hId });

        return { data: leave }
    }

    @Delete("/:hId/delete")
    @Access({ resource: "leave-history", action: "delete" })
    async delete_leave_history(@Param("hId") hId: string): Promise<ApiResponse> {
        const result = await this.leaveHistoryService.delete({ _id: hId });

        return { data: result };
    }
}
