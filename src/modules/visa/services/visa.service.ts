import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Visa, VisaDocument } from '../visa.schema';
import { Connection, Model, Types } from 'mongoose';
import { CreateVisaDto } from '../dto/create-visa.dto';
import { KeyValDto } from '../dto/key-val.dto';
import { UpdateVisaDto } from '../dto/update-visa.dto';
import { IVisa } from '../interfaces/visa.interface';
import { VisaHistoryService } from '@module/visa-history/services/visa-history.service';
import { withTransaction } from '@common/utils';
import { JwtRequestPayload } from '@common/types/payload.type';

@Injectable()
export class VisaService {
    constructor(
        @InjectModel(Visa.name) private visaModel: Model<VisaDocument>,

        @InjectConnection()
        private readonly connection: Connection,

        private readonly historyService: VisaHistoryService
    ) { }

    async create(reqData: CreateVisaDto, user: JwtRequestPayload): Promise<IVisa> {
        const created = await this.visaModel.create({
            ...reqData,
            employee_id: new Types.ObjectId(reqData.employee_id),
            assigned_manager_id: new Types.ObjectId(user.sub)
        });
        return created;
    }

    async readAll(): Promise<IVisa[]> {

        const visas = await this.visaModel.find().lean();
        return visas;
    }

    async readSingle(keyVal: KeyValDto): Promise<IVisa> {
        const visa = await this.visaModel.findOne(keyVal).lean();

        if (!visa) {
            throw new NotFoundException(`Visa record not found for ID: '${keyVal["_id"]}'`);
        }

        return visa;
    }

    async update(keyVal: KeyValDto, reqData: UpdateVisaDto, user:JwtRequestPayload): Promise<IVisa> {
        return withTransaction(this.connection, async (session) => {
            const visa = await this.visaModel.findOne(keyVal);

            if (!visa) {
                throw new NotFoundException(`Visa record not found for ID: '${keyVal._id}'`)
            }

            if (reqData.status) {
                await this.historyService.create(
                    {
                        visa_id: new Types.ObjectId,
                        old_status: visa.status,
                        new_status: reqData.status,
                        changed_by: new Types.ObjectId(user.role_id)
                    },
                    session
                );
            }

            Object.assign(visa, reqData);
            await visa.save({ session });

            return visa;
        });
    }

    async delete(keyVal: KeyValDto): Promise<IVisa> {
        const deleted = await this.visaModel.findOneAndDelete(keyVal);

        if (!deleted) {
            throw new NotFoundException(`Visa record not found for ID: '${keyVal["_id"] || keyVal["employee_id"]}'`);
        }

        return deleted;
    }
}