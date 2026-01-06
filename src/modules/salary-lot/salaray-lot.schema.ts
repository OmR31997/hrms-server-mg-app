import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

export type SalaryLotDocument = SalaryLot & Document;

@Schema({ timestamps: true })
export class SalaryLot {
    @Prop({ type: Types.ObjectId, ref: "Company", required: [true, `'company_id' must be required`] })
    company_id: Types.ObjectId;

    @Prop({ required: [true, `'lot_size' must be required`], unique: true, lowercase: true, trim: true })
    lot_size: string;

    @Prop({ required: [true, `'total_amount' must be required`], select: false })
    total_amount: number;

    @Prop({ type: Types.ObjectId, ref: "Role", required: [true, `'created_by' must be required`] })
    created_by: Types.ObjectId;
}

export const SalaryLotSchema = SchemaFactory.createForClass(SalaryLot)