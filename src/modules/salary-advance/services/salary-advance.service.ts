import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { SalaryAdvance, SalaryAdvanceDocument } from '../salary-advance.schema';
import { Connection, Model, Types } from 'mongoose';
import { CreateSalaryAdvanceDto } from '../dto/create-salary-advance.dto';
import { ISalaryAdvance } from '../interfaces/salary-advance.interface';
import { KeyValDto } from '../dto/key-val.dto';
import { UpdateSalaryAdvanceDto } from '../dto/update-salary-advance.dto';
import { withTransaction } from '@common/utils';
import { AdvanceHistoryService } from '@module/advance-history/services/advance-history.service';
import { Performer } from '@module/advance-history/types/advance-history.type';
import { JwtRequestPayload } from '@common/types/payload.type';

@Injectable()
export class SalaryAdvanceService {
    constructor(
        @InjectModel(SalaryAdvance.name)
        private salaryAdvanceModel: Model<SalaryAdvanceDocument>,

        @InjectConnection() 
        private readonly connection: Connection,

        private readonly advanceHistoryService: AdvanceHistoryService
    ) { }

    async create(reqData: CreateSalaryAdvanceDto, user:JwtRequestPayload): Promise<ISalaryAdvance> {
        return withTransaction(this.connection, async (session) => {
            const [createdDeduction] = await this.salaryAdvanceModel.create([{
                ...reqData,
                approved_by: new Types.ObjectId(user.role_id)
            }], { session });

            await this.advanceHistoryService.create({
                advance_id: createdDeduction._id,
                action: Performer.REQUEST,
                performed_by: new Types.ObjectId(user.role_id)
            }, session);

            return createdDeduction;
        });
    }

    async readAll(): Promise<ISalaryAdvance[]> {
        const result = await this.salaryAdvanceModel.find()
            .populate({ path: "approved_by" })
            .lean();

        return result;
    }

    async readOne(keyVal: KeyValDto): Promise<ISalaryAdvance> {
        const result = await this.salaryAdvanceModel.findOne(keyVal)
            .lean();

        if (!result) {
            throw new NotFoundException(`Account not found for ID: '${keyVal._id}'`)
        }

        return result;
    }

    async update(keyVal: KeyValDto, reqData: UpdateSalaryAdvanceDto, approved_by: string): Promise<ISalaryAdvance> {
        const updated = await this.salaryAdvanceModel.findOneAndUpdate(
            keyVal,
            {
                ...reqData,
                approved_by: new Types.ObjectId(approved_by)
            },
            { new: true, runValidators: true }
        );

        if (!updated) {
            throw new NotFoundException(`Account not found for ID: '${keyVal._id}'`)
        }

        return updated;
    }

    async delete(keyVal: KeyValDto): Promise<ISalaryAdvance> {
        const deleted = await this.salaryAdvanceModel.findOneAndDelete(keyVal);

        if (!deleted) {
            throw new NotFoundException(`Account not found for ID: '${keyVal._id}'`)
        }

        return deleted;
    }
}
