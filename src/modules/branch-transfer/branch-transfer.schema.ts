import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Status } from "./dto/create-branch-transfer.dto";

export type BranchTransferDocument = BranchTransfer & Document;

@Schema({ timestamps: { createdAt: true, updatedAt: false } })
export class BranchTransfer {
    
    @Prop({ required: [true, `'employee_id' field must be required`] })
    employee_id: Types.ObjectId;
    
    @Prop({ required: [true, `'from_branch_id' field must be required`] })
    from_branch_id: Types.ObjectId;
    
    @Prop({ required: [true, `'to_branch_id' field must be required`] })
    to_branch_id: Types.ObjectId;
    
    @Prop({ required: [true, `'equested_by' field must be required`] })
    requested_by: Types.ObjectId;
    
    @Prop({ required: [true, `'approved_by' field must be required`] })
    approved_by: Types.ObjectId;
    
    @Prop()
    effective_date: Date;
    
    @Prop({ default: "under_process", enum: Object.values(Status) })
    status: string;
}

export const BranchTransferSchema = SchemaFactory.createForClass(BranchTransfer);