import objectIdPlugin from "@common/utils/objectId.plugin";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

export type SalaryLockDocument = SalaryLock & Document;

@Schema({ timestamps: { createdAt: "locked_at" } })
export class SalaryLock {
    @Prop({ type:Types.ObjectId, ref:"Salary", required: [true, `'salary_id' must be required`] })
    salary_id: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: "Role", required: [true, `'locked_by' must be required`] })
    locked_by: Types.ObjectId;

    @Prop({ required: [true, `'unlock_reason' must be required`] })
    unlock_reason: string;

    @Prop({ type: Types.ObjectId, ref: "Role", required: [true, `'unlocked_by' must be required`] })
    unlocked_by: Types.ObjectId;
}

export const SalaryLockSchema = SchemaFactory.createForClass(SalaryLock)

SalaryLockSchema.plugin(objectIdPlugin);