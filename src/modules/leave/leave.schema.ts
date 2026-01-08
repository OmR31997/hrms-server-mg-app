import objectIdPlugin from "@common/utils/objectId.plugin";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

export type LeaveDocument = Leave & Document;

@Schema({timestamps: {createdAt: 'joining_date'}})
export class Leave {

    @Prop({ type: Types.ObjectId, ref: "Employee", required: [true, `'employee_id' must be required`] })
    employee_id: Types.ObjectId;

    @Prop({ required: [true, `'leave_type' must be required`] })
    leave_type: string;

    @Prop({ required: [true, `'from_date' must be required`] })
    from_date: string;

    @Prop({ required: [true, `'to_date' must be required`] })
    to_date: string;

    @Prop({ required: [true, `'status' must be required`] })
    status: string;

    @Prop({ type: Types.ObjectId, ref:"Role", default: null })
    approved_by: Types.ObjectId;
}

export const LeaveSchema = SchemaFactory.createForClass(Leave);

LeaveSchema.plugin(objectIdPlugin);