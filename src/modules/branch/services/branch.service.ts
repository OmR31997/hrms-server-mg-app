import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Branch, BranchDocument } from '../branch.schema';
import { Model } from 'mongoose';
import { CreateBranchDto } from '../dto/create-branch.dto';
import { success, SuccessResponse } from 'src/utils/respons.interface';
import { UpadateBranchDto } from '../dto/update-branch.dto';
import { KeyValDto } from '../dto/key-val.dto';

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

    async readById(keyVal: KeyValDto): Promise<SuccessResponse> {
        const branch = await this.branchModel.findOne(keyVal).lean();

        if (!branch) {
            throw new NotFoundException(`Branch not found for ID: '${keyVal["_id"]}'`);
        }

        return success("Data fetched successfully", branch);
    }

    async update(keyVal: KeyValDto, reqData: UpadateBranchDto): Promise<SuccessResponse> {
        const updated = await this.branchModel.findOneAndUpdate(keyVal, reqData, { new: true, runValidators: true });

        if (!updated) {
            throw new NotFoundException(`Branch not found for ID: '${keyVal["_id"]}'`);
        }

        return success("Branch updated successfully", updated);
    }

    async delete(keyVal: KeyValDto): Promise<SuccessResponse> {
        const deleted = await this.branchModel.findOneAndDelete(keyVal);

        if (!deleted) {
            throw new NotFoundException(`Branch not found for ID: '${keyVal["_id"]}'`);
        }

        return success("Branch deleted successfully", deleted);
    }
}
