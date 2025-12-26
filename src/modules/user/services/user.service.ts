import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { success, SuccessResponse } from 'src/utils/respons.interface';
import { Model } from 'mongoose';
import { User, UserDocument } from '../user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { UpadateUserDto } from '../dto/update-user.dto';
import { KeyValDto } from '../dto/key-val.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { };

    async create(reqData: CreateUserDto): Promise<SuccessResponse> {
        const created = await this.userModel.create(reqData);
        return success("User created successfully.", created);
    }

    async readAll(): Promise<SuccessResponse> {
        const users = await this.userModel.find().lean();

        return success("Data fetched successfully", users);
    }

    async readById(keyVal: KeyValDto): Promise<SuccessResponse> {
        const user = await this.userModel.findOne(keyVal).lean();

        if(!user) {
            throw new NotFoundException(`User not found for ID: '${keyVal["_id"]}'`);
        }

        return success("Data fetched successfully", user);
    }

    async update(keyVal: KeyValDto, reqData: UpadateUserDto): Promise<SuccessResponse> {
        const updated = await this.userModel.findOneAndUpdate(keyVal, reqData, {new: true, runValidators: true});
        
        if(!updated) {
            throw new NotFoundException(`User not found for ID: '${keyVal["_id"]}'`);
        }

        return success("User updated successfully", updated);
    }

    async delete(keyVal: KeyValDto): Promise<SuccessResponse> {
        const deleted = await this.userModel.findOneAndDelete(keyVal);

        if(!deleted) {
            throw new NotFoundException(`User not found for ID: '${keyVal["_id"]}'`);
        }

        return success("User deleted successfully", deleted);
    }
}
