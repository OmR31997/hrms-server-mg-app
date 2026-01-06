import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role, RoleDocument } from '../role.schema';
import { Model, Types } from 'mongoose';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { KeyValDto } from '../dto/key-val.dto';
import { IRole } from '../interfaces/role.interface';

@Injectable()
export class RoleService {
    constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) { }

    async create(reqData: CreateRoleDto): Promise<IRole> {
        const created = await this.roleModel.create({
            ...reqData,
            company_id: new Types.ObjectId(reqData.company_id),
        });
        
        return created;
    }

    async readAll(): Promise<IRole[]> {
        const roles = await this.roleModel.find().lean();

        return roles;
    }

    async readById(keyVal: KeyValDto): Promise<IRole> {
        const role = await this.roleModel.findOne(keyVal).lean();

        if (!role) {
            throw new NotFoundException(`Role not found for ID: '${keyVal["_id"]}'`);
        }

        return role;
    }

    async update(keyVal: KeyValDto, reqData: UpdateRoleDto): Promise<IRole> {
        const updated = await this.roleModel.findOneAndUpdate(keyVal, reqData, { new: true, runValidators: true });

        if (!updated) {
            throw new NotFoundException(`Role not found for ID: '${keyVal["_id"]}'`);
        }

        return updated;
    }

    async delete(keyVal: KeyValDto): Promise<IRole> {
        const deleted = await this.roleModel.findOneAndDelete(keyVal);

        if (!deleted) {
            throw new NotFoundException(`Role not found for ID: '${keyVal["_id"]}'`);
        }

        return deleted;
    }
}
