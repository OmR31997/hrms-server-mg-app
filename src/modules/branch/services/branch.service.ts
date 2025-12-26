import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Branch, BranchDocument } from '../branch.schema';
import { Model } from 'mongoose';
import { CreateBranchDto } from '../dto/create-branch.dto';
import { success, SuccessResponse } from 'src/utils/respons.interface';
import { UpadateBranchDto } from '../dto/update-branch.dto';

@Injectable()
export class BranchService {
    constructor(@InjectModel(Branch.name) private branchModel: Model<BranchDocument>) { }

    async create(reqData: CreateBranchDto): Promise<SuccessResponse> {
        
        const created = await this.branchModel.create(reqData);

        return success("New branch created successfully", created);
    }

    async readAll(): Promise<SuccessResponse> {
        const branches = await this.branchModel.find().lean();

        return success("Data fetched successfully", branches);
    }

    async readById(keyWal: Object): Promise<SuccessResponse> {
        const branch = await this.branchModel.findOne(keyWal).lean();

        if (!branch) {
            throw new NotFoundException(`Branch not found for ID: '${keyWal["_id"]}'`);
        }

        return success("Data fetched successfully", branch);
    }

    async update(keyWal: Object, reqData: UpadateBranchDto): Promise<SuccessResponse> {
        const updated = await this.branchModel.findOneAndUpdate(keyWal, reqData, { new: true, runValidators: true });

        if (!updated) {
            throw new NotFoundException(`Branch not found for ID: '${keyWal["_id"]}'`);
        }

        return success("Branch updated successfully", updated);
    }

    async delete(keyWal: Object): Promise<SuccessResponse> {
        const deleted = await this.branchModel.findOneAndDelete(keyWal);

        if (!deleted) {
            throw new NotFoundException(`Branch not found for ID: '${keyWal["_id"]}'`);
        }

        return success("Branch deleted successfully", deleted);
    }
}
