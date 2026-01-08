import { Module } from '@nestjs/common';
import { NotificationService } from './services/notification.service';
import { NotificationController } from './controllers/notification.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Notification, NotificationSchema } from './notification.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Notification.name, schema: NotificationSchema}])
  ],
  providers: [NotificationService],
  controllers: [NotificationController]
})
export class NotificationModule {}
