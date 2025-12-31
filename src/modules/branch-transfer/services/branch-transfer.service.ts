import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BranchTransfer, BranchTransferDocument } from '../branch-transfer.schema';
import { Model } from 'mongoose';
import { CreateBranchTransferDto } from '../dto/create-branch-transfer.dto';
import { IBranchTransfer } from '../interfaces/branch-transfer.interface';
import { KeyValDto } from '../dto/key-val.dto';
import { UpdateBranchTransferDto } from '../dto/update-branch-transfer.dto';

@Injectable()
export class BranchTransferService {
    constructor(
        @InjectModel(BranchTransfer.name)
        private branchTranferModel: Model<BranchTransferDocument>
    ) { }

    async create(reqData: CreateBranchTransferDto): Promise<IBranchTransfer> {
        const created = await this.branchTranferModel.create(reqData);

        return created;
    }

    async readAll(): Promise<IBranchTransfer[]> {
        const result = await this.branchTranferModel.find();
        return result;
    }

    async readSingle(keyVal: KeyValDto): Promise<IBranchTransfer> {
        const result = await this.branchTranferModel.findOne(keyVal);

        if (!result) {
            throw new NotFoundException("Data fetched successfully.");
        }

        return result;
    }

    async update(keyVal: KeyValDto, reqData: UpdateBranchTransferDto): Promise<IBranchTransfer> {
        const updated = await this.branchTranferModel.findOneAndUpdate(
            keyVal,
            reqData,
            { new: true, runValidators: true }
        );

        if (!updated) {
            throw new NotFoundException(`Requst not found for ID: '${keyVal._id}'`);
        }

        return updated;
    }

    async delete(keyVal: KeyValDto): Promise<IBranchTransfer> {
        const deleted = await this.branchTranferModel.findByIdAndDelete(keyVal);

        if (!deleted) {
            throw new NotFoundException(`Requst not found for ID: '${keyVal._id}'`);
        }

        return deleted;
    }
}
