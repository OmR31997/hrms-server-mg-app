import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { AuditLogService } from '../services/audit-log.service';
import { ApiResponse, SuccessInterceptor } from '@common/interceptors/success.interceptor';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Access } from '@common/decorators';

@ApiBearerAuth("access-token")
@Controller('audit-log')
@UseInterceptors(SuccessInterceptor)
export class AuditLogController {
    constructor(private readonly auditLogService:AuditLogService){}

    @Get("/read")
    @Access({ resource: "audit-log", action: "read" })
    async get_audit_logs(): Promise<ApiResponse>{
        const result = await this.auditLogService.readAll();
        return {data:result};
    }

    @Get("/:logId/read")
    @Access({ resource: "audit-log", action: "read" })
    async get_audit_log(@Param("logId") logId:string): Promise<ApiResponse>{
        const result = await this.auditLogService.readOne({_id: logId});
        return {data: result};
    }

    @Get("/:logId/delete")
    @Access({ resource: "audit-log", action: "delete" })
    async delete_audit_log(@Param("logId") logId:string): Promise<ApiResponse>{
        const result = await this.auditLogService.delete({_id: logId});
        return {data: result};
    }
}
