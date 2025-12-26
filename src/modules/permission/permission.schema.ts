import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type PermissionDocument = Permission & Document;

@Schema({ timestamps: true })
export class Permission {

    @Prop({ required: [true, `'resource' field must be required`] })
    resource: string;

    @Prop({ unique: true, required: [true, `'action' field must be required`], enum: ["read", "create", "update", "delete"] })
    action: string;

    @Prop({ unique: true, required: [true, `'scope' field must be required`], enum: ["self", "global"] })
    scope: string;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);

// Unique constraint
PermissionSchema.index(
    { resource: 1, action: 1, scope: 1 },
    { unique: true }
)