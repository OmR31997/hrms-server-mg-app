import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Permission, PermissionDocument } from '../permission.schema';
import { Model } from 'mongoose';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { success, SuccessResponse } from 'src/utils/response.interface';
import { UpdatePermissionDto } from '../dto/update-permission.dto';
import { KeyValDto } from '../dto/key-val.dto';
import { IPermission } from '../interfaces/permission.interface';

@Injectable()
export class PermissionService {
    constructor(@InjectModel(Permission.name) private permissionModel: Model<PermissionDocument>) { }

    async create(reqData: CreatePermissionDto): Promise<IPermission> {
        const created = await this.permissionModel.create(reqData);
        return created;
    }

    async readAll(): Promise<IPermission[]> {
        const permissions = await this.permissionModel.find().lean();

        return permissions;
    }

    async readById(keyVal: KeyValDto): Promise<IPermission> {
        const permission = await this.permissionModel.findOne(keyVal).lean();

        if (!permission) {
            throw new NotFoundException(`Permission not found for ID: '${keyVal["_id"]}'`);
        }

        return permission;
    }

    async update(keyVal: KeyValDto, reqData: UpdatePermissionDto): Promise<IPermission> {
        const updated = await this.permissionModel.findOneAndUpdate(keyVal, reqData, { new: true, runValidators: true });

        if (!updated) {
            throw new NotFoundException(`Permission not found for ID: '${keyVal["_id"]}'`);
        }

        return updated;
    }

    async delete(keyVal: KeyValDto): Promise<IPermission> {
        const deleted = await this.permissionModel.findOneAndDelete(keyVal);

        if (!deleted) {
            throw new NotFoundException(`Permission not found for ID: '${keyVal["_id"]}'`);
        }

        return deleted;
    }
}
