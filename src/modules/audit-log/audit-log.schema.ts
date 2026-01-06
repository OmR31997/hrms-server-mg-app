import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types, Schema as MongooseSchema } from "mongoose";

export type AuditLogDocument = AuditLog & Document;

@Schema({ timestamps: {createdAt: true} })

export class AuditLog {
    @Prop({ required: [true, `'entity' must be required`] })
    entity: string;

    @Prop({ required: [true, `'entity_id' must be required`] })
    entity_id: Types.ObjectId;

    @Prop({ required: [true, `'action' must be required`] })
    action: string;

    @Prop({ type: MongooseSchema.Types.Mixed, required: [true, `'before_data' must be required`] })
    before_data: Record<string, any>;

    @Prop({ type: MongooseSchema.Types.Mixed, required: [true, `'after_data' must be required`] })
    after_data: Record<string, any>;

    @Prop({ required: [true, `'ip_address' must be required`] })
    ip_address: string;

    @Prop({ required: [true, `'performed_by' must be required`] })
    performed_by: Types.ObjectId;
}

export const AuditLogSchema = SchemaFactory.createForClass(AuditLog)