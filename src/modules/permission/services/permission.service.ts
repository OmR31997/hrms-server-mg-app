import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Permission, PermissionDocument } from '../permission.schema';
import { Model } from 'mongoose';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { success, SuccessResponse } from 'src/utils/respons.interface';
import { UpdatePermissionDto } from '../dto/update-permission.dto';
import { KeyValDto } from '../dto/key-val.dto';

@Injectable()
export class PermissionService {
    constructor(@InjectModel(Permission.name) private permissionModel: Model<PermissionDocument>) { }

    async create(reqData: CreatePermissionDto): Promise<SuccessResponse> {
        const created = await this.permissionModel.create(reqData);

        return success("Permission created successfully.", created);
    }

    async readAll(): Promise<SuccessResponse> {
        const permissions = await this.permissionModel.find().lean();

        return success("Data fetched successfully", permissions);
    }

    async readById(keyVal: KeyValDto): Promise<SuccessResponse> {
        const permission = await this.permissionModel.findOne(keyVal).lean();

        if (!permission) {
            throw new NotFoundException(`Permission not found for ID: '${keyVal["_id"]}'`);
        }

        return success("Data fetched successfully", permission);
    }

    async update(keyVal: KeyValDto, reqData: UpdatePermissionDto): Promise<SuccessResponse> {
        const updated = await this.permissionModel.findOneAndUpdate(keyVal, reqData, { new: true, runValidators: true });

        if (!updated) {
            throw new NotFoundException(`Permission not found for ID: '${keyVal["_id"]}'`);
        }

        return success("Permission updated successfully", updated);
    }

    async delete(keyVal: KeyValDto): Promise<SuccessResponse> {
        const deleted = await this.permissionModel.findOneAndDelete(keyVal);

        if (!deleted) {
            throw new NotFoundException(`Permission not found for ID: '${keyVal["_id"]}'`);
        }

        return success("Permission deleted successfully", deleted);
    }
}
