import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { Model } from 'mongoose';
import { User, UserDocument } from '../user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { UpadateUserDto } from '../dto/update-user.dto';
import { KeyValDto } from '../dto/key-val.dto';
import { IUser } from '../interfaces/user.interface';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { };

    async create(reqData: CreateUserDto): Promise<IUser> {
        const created = await this.userModel.create(reqData);
        return created;
    }

    async readAll(): Promise<IUser[]> {
        const users = await this.userModel.find().lean();

        return users;
    }

    async readSingle(keyVal: KeyValDto, select: string | null = null): Promise<IUser> {
        const query = this.userModel.findOne(keyVal);

        if (select) {
            query.select(select);
        }

        const user = await query.lean();

        if (!user) {
            throw new NotFoundException(`User not found for ID: '${keyVal["_id"]}'`);
        }

        return user;
    }

    async update(keyVal: KeyValDto, reqData: UpadateUserDto): Promise<IUser> {
        const updated = await this.userModel.findOneAndUpdate(keyVal, reqData, { new: true, runValidators: true });

        if (!updated) {
            throw new NotFoundException(`User not found for ID: '${keyVal["_id"]}'`);
        }

        return updated;
    }

    async delete(keyVal: KeyValDto): Promise<IUser> {
        const deleted = await this.userModel.findOneAndDelete(keyVal);

        if (!deleted) {
            throw new NotFoundException(`User not found for ID: '${keyVal["_id"]}'`);
        }

        return deleted;
    }
}
