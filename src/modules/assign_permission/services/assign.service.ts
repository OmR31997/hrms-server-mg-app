import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AssignPermission, AssignPermissionDocument } from '../assign_permission.schema';
import { Model, Types } from 'mongoose';
import { CreateAssignPermissionDto } from '../dto/create-assign_permission.dto';
import { KeyValDto } from '../dto/key-val.dto';
import { IAssignPermission } from '../interfaces/assign_permission.interface';

@Injectable()
export class AssignService {
    constructor(@InjectModel(AssignPermission.name) private assignModel: Model<AssignPermissionDocument>) { }

    /*
    async createOrUpdate(reqData: CreateAssignPermissionDto): Promise<SuccessResponse> {
        const { role_id, permission_id } = reqData;

        const result = await this.assignModel.findOneAndUpdate(
            { role_id },
            {
                $addToSet: {
                    permission_ids: { $each: permission_ids }
                }
            },
            { new: true, upsert: true }
        );

        return success("Permission assigned successfully.", result);
    }

    async add(keyVal: KeyValDto, reqData: UpadateAssignPermissionsDto): Promise<SuccessResponse> {

        const result = await this.assignModel.findOneAndUpdate(
            keyVal,
            {
                $addToSet: {
                    permission_ids: { $each: reqData.permission_ids }
                }
            },
            { new: true }
        );

        return success("Permission assigned successfully.", result);
    }

    async drop(keyVal: KeyValDto, reqData: UpadateAssignPermissionsDto): Promise<SuccessResponse> {
        const result = await this.assignModel.findOneAndUpdate(
            keyVal,
            {
                $pull: {
                    permission_ids: { $in: reqData.permission_ids }
                }
            },
            { new: true }
        );

        return success("Permission dropped successfully.", result);
    }
    */

    async create(reqData: CreateAssignPermissionDto):Promise<IAssignPermission> {
        
        const role_id = new Types.ObjectId(reqData.role_id);
        const permission_id = new Types.ObjectId(reqData.permission_id);
        
        const created = await this.assignModel.create({role_id, permission_id});

        return created;
    }

    async readAll(): Promise<IAssignPermission[]> {
        const result = await this.assignModel.find().lean();

        return result;
    }

    async readByRole(keyVal:KeyValDto): Promise<IAssignPermission[]> {
        const result = await this.assignModel.find(keyVal).lean();

        return result;
    }

    async readSingle(keyVal: KeyValDto): Promise<IAssignPermission> {
        const result = await this.assignModel.findOne(keyVal).lean();

        if (!result) {
            throw new NotFoundException(`Assigned permission not found for ID: '${keyVal["_id"] || keyVal["role_id"]}'`);
        }

        return result;
    }

    async delete(keyVal: KeyValDto): Promise<IAssignPermission> {
        const deleted = await this.assignModel.findOneAndDelete(keyVal);

        if (!deleted) {
            throw new NotFoundException(`Assigned permission not found for ID: '${keyVal["_id"]}'`);
        }

        return deleted;
    }
}
