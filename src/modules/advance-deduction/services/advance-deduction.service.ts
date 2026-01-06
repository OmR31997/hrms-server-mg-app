import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { AdvanceDeduction, AdvanceDeductionDocument } from '../advance-deduction.schema';
import { Connection, Model, Types } from 'mongoose';
import { CreateAdvanceDeduction } from '../types/create-advance-deduction.type';
import { IAdvanceDeduction } from '../interface/advance-deduction.inteface';
import { KeyValDto } from '../dto/keyVal.dto';
import { withTransaction } from '@common/utils';
import { AdvanceHistoryService } from '@module/advance-history/services/advance-history.service';
import { Performer } from '@module/advance-history/types/advance-history.type';
import { JwtRequestPayload } from '@common/types/payload.type';

@Injectable()
export class AdvanceDeductionService {
    constructor(
        @InjectModel(AdvanceDeduction.name)
        private advanceDeductionModel: Model<AdvanceDeductionDocument>,

        private advanceHistoryService: AdvanceHistoryService,

        @InjectConnection()
        private readonly connection: Connection,
    ) { }

    async create(reqData: CreateAdvanceDeduction, user:JwtRequestPayload): Promise<IAdvanceDeduction> {

        return withTransaction(this.connection, async (session) => {
            const [createdDeduction] = await this.advanceDeductionModel.create([reqData], { session });

            await this.advanceHistoryService.create({
                advance_id: createdDeduction.advance_id,
                action: Performer.DEDUCT,
                performed_by: new Types.ObjectId(user.role_id)
            }, session);

            return createdDeduction;
        });
    }

    async readAll(): Promise<IAdvanceDeduction[]> {
        const result = await this.advanceDeductionModel.find().lean();
        return result;
    }

    async readOne(keyVal: KeyValDto): Promise<IAdvanceDeduction> {
        const result = await this.advanceDeductionModel.findOne(keyVal).lean();

        if (!result) {
            throw new NotFoundException(`Deduction not found for ID: '${keyVal["_id"] || keyVal["role_id"]}'`);
        }

        return result;
    }

    async delete(keyVal: KeyValDto): Promise<IAdvanceDeduction> {
        const deleted = await this.advanceDeductionModel.findOneAndDelete(keyVal);

        if (!deleted) {
            throw new NotFoundException(`Deduction not found for ID: '${keyVal["_id"]}'`);
        }

        return deleted;
    }
}
