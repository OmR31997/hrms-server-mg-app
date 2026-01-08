import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Notification, NotificationDocument } from '../notification.schema';
import { Model, Types } from 'mongoose';
import { CreateNotification } from '../types/create-notification.type';
import { KeyValDto } from '@common/dto/key-val.dto';

interface INotification extends Notification {
    _id: Types.ObjectId;
}

@Injectable()
export class NotificationService {
    constructor(
        @InjectModel(Notification.name)
        private nofificationModel: Model<NotificationDocument>
    ) { }

    async create(reqData: CreateNotification): Promise<INotification> {
        const created = await this.nofificationModel.create(reqData);
        return created;
    }

    async readAll(): Promise<INotification[]> {
        const notifications = await this.nofificationModel.find().lean();
        return notifications;
    }

    async readOne(keyVal: KeyValDto): Promise<INotification> {
        const notification = await this.nofificationModel.findOne(keyVal).lean();

        if (!notification) {
            throw new NotFoundException(`Notification not found for ID: ${keyVal._id}`)
        }
        return notification;
    }

    async delete(keyVal: KeyValDto): Promise<INotification> {
        const deleted = await this.nofificationModel.findOneAndDelete(keyVal);

        if (!deleted) {
            throw new NotFoundException(`Notification not found for ID: ${keyVal._id}`)
        }
        return deleted;
    }
}
