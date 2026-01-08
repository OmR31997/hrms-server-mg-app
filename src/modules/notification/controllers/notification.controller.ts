import { Controller, Delete, Get, Param, UseInterceptors } from '@nestjs/common';
import { NotificationService } from '../services/notification.service';
import { ApiResponse, SuccessInterceptor } from '@common/interceptors/success.interceptor';
import { KeyValDto } from '@common/dto/key-val.dto';
import { Access } from '@common/decorators';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth("access-token")
@Controller('notification')
@UseInterceptors(SuccessInterceptor)
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) { }

    @Get("/read")
    @Access({resource: "notification", action:"read"})
    async get_notifications(): Promise<ApiResponse> {
        const notifications = await this.notificationService.readAll();
        return {data: notifications};
    }

    @Get("/:notificationId/read")
    @Access({resource: "notification", action:"read"})
    async readOne(@Param("notificationId") notificationId:string): Promise<ApiResponse> {
        const notification = await this.notificationService.readOne({_id: notificationId});
        return {data: notification};
    }

    @Delete("/:notificationId/delete")
    @Access({resource: "notification", action:"delete"})
    async delete(@Param("notificationId") notificationId:string): Promise<ApiResponse> {
        const deleted = await this.notificationService.delete({_id: notificationId});
        return {message: "Notification deleted successfully", data: deleted};
    }
}
