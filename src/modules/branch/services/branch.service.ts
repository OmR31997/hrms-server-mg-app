import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Branch, BranchDocument } from '../branch.schema';
import { Model } from 'mongoose';
import { CreateBranchDto } from '../dto/create-branch.dto';
import { UpadateBranchDto } from '../dto/update-branch.dto';
import { KeyValDto } from '../dto/key-val.dto';
import { IBranch } from '../interfaces/branch.interface';

@Injectable()
export class BranchService {
    constructor(@InjectModel(Branch.name) private branchModel: Model<BranchDocument>) { }

    async create(reqData: CreateBranchDto): Promise<IBranch> {
        const created = await this.branchModel.create(reqData);
        return created;
    }

    async readAll(): Promise<IBranch[]> {
        const branches = await this.branchModel.find().lean();
        return branches;
    }

    async readSingle(keyVal: KeyValDto): Promise<IBranch> {
        const branch = await this.branchModel.findOne(keyVal).lean();

        if (!branch) {
            throw new NotFoundException(`Branch not found for ID: '${keyVal["_id"]}'`);
        }

        return branch;
    }

    async update(keyVal: KeyValDto, reqData: UpadateBranchDto): Promise<IBranch> {
        const updated = await this.branchModel.findOneAndUpdate(keyVal, reqData, { new: true, runValidators: true });

        if (!updated) {
            throw new NotFoundException(`Branch not found for ID: '${keyVal["_id"]}'`);
        }

        return updated;
    }

    async delete(keyVal: KeyValDto): Promise<IBranch> {
        const deleted = await this.branchModel.findOneAndDelete(keyVal);

        if (!deleted) {
            throw new NotFoundException(`Branch not found for ID: '${keyVal["_id"]}'`);
        }

        return deleted;
    }
}
