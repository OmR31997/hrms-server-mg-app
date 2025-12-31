import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type AssignPermissionDocument = AssignPermission & Document;

@Schema({ timestamps: true })
export class AssignPermission {

    @Prop({ type: Types.ObjectId, ref: "Role", required: [true, `'role_id' must be required`] })
    role_id: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: "Permission", required: [true, `'permission_id' is required`] })
    permission_id: Types.ObjectId;

}

export const AssignPermissionSchema = SchemaFactory.createForClass(AssignPermission);

AssignPermissionSchema.index({ role_id: 1, permission_id: 1 }, { unique: true });