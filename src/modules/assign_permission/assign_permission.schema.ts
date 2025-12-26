import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type AssignPermissionDocument = AssignPermission & Document;

@Schema({ timestamps: true })
export class AssignPermission {

    @Prop({ type: Types.ObjectId, ref: "Role", unique: true, required: [true, `'role_id' must be required`] })
    role_id: Types.ObjectId;

    @Prop({
        type: [{type: Types.ObjectId, ref: "Permission"}],
        validate: [(val: any[]) => val.length > 0, `'permission_ids' cannot be empty`],
        required: [true, `'permission_ids' is required`]
    })
    permission_ids: Types.ObjectId[];

}

export const AssignPermissionSchema = SchemaFactory.createForClass(AssignPermission);