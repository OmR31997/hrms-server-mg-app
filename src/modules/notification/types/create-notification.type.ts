import { Types } from "mongoose"

export enum Channel {
    EMAIL = "email",
    SMS = "sms",
    APP = "app"
}

export type CreateNotification = {
    user_id: Types.ObjectId;
    type: string;
    channel: Channel,
    message: string,
    status: string
}