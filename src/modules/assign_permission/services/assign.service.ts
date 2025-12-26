import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AssignPermission, AssignPermissionDocument } from '../assign_permission.schema';
import { Model } from 'mongoose';
import { CreateAssignPermissionDto } from '../dto/create-assign_permission.dto';
import { success } from 'src/utils/respons.interface';
import { UpadateAssignPermissionsDto } from '../dto/update-assign_permission.dto';
import { KeyValDto } from '../dto/key-val.dto';

@Injectable()
export class AssignService {
    constructor(@InjectModel(AssignPermission.name) private assignModel: Model<AssignPermissionDocument>) { }

    async createOrUpdate(reqData: CreateAssignPermissionDto) {
        const { role_id, permission_ids } = reqData;

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

    async add(keyVal: KeyValDto, reqData: UpadateAssignPermissionsDto) {

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

    async drop(keyVal: KeyValDto, reqData: UpadateAssignPermissionsDto) {
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

    async readAll() {
        const result = await this.assignModel.find().lean();

        return success("Data fetched successfully", result);
    }

    async readById(keyVal: KeyValDto) {
        const result = await this.assignModel.findOne(keyVal).lean();

        if (!result) {
            throw new NotFoundException(`Assigned permission not found for ID: '${keyVal["_id"] || keyVal["role_id"]}'`);
        }

        return success("Data fetched successfully", result);
    }

    async delete(keyVal: KeyValDto) {
        const deleted = await this.assignModel.findOneAndDelete(keyVal);

        if (!deleted) {
            throw new NotFoundException(`Assigned permission not found for ID: '${keyVal["_id"]}'`);
        }
        return success("Assigned permissions deleted successfully.", deleted);
    }
}
