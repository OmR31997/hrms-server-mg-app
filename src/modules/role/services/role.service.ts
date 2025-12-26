import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role, RoleDocument } from '../role.schema';
import { Model } from 'mongoose';
import { CreateRoleDto } from '../dto/create-role.dto';
import { success, SuccessResponse } from 'src/utils/respons.interface';
import { UpdateRoleDto } from '../dto/update-role.dto';

@Injectable()
export class RoleService {
    constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) { }

    async create(reqData: CreateRoleDto): Promise<SuccessResponse> {
        const created = await this.roleModel.create(reqData);

        return success("Role created successfully.", created);
    }

    async readAll(): Promise<SuccessResponse> {
        const roles = await this.roleModel.find().lean();

        return success("Data fetched successfully", roles);
    }

    async readById(keyWal: Object): Promise<SuccessResponse> {
        const role = await this.roleModel.findOne(keyWal).lean();

        if (!role) {
            throw new NotFoundException(`Role not found for ID: '${keyWal["_id"]}'`);
        }

        return success("Data fetched successfully", role);
    }

    async update(keyWal: Object, reqData: UpdateRoleDto): Promise<SuccessResponse> {
        const updated = await this.roleModel.findOneAndUpdate(keyWal, reqData, { new: true, runValidators: true });

        if (!updated) {
            throw new NotFoundException(`Role not found for ID: '${keyWal["_id"]}'`);
        }

        return success("Role updated successfully", updated);
    }

    async delete(keyWal: Object): Promise<SuccessResponse> {
        const deleted = await this.roleModel.findOneAndDelete(keyWal);

        if (!deleted) {
            throw new NotFoundException(`Role not found for ID: '${keyWal["_id"]}'`);
        }

        return success("Role deleted successfully", deleted);
    }
}
