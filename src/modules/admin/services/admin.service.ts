import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Admin, AdminDocument } from '../admin.schema';
import { Model } from 'mongoose';
import { RoleService } from 'src/modules/role/services/role.service';
import * as bcrypt from "bcrypt";
import { KeyValDto } from '../dto/key-val.dto';
import { IAdmin } from '../interfaces/admin.inteface';

@Injectable()
export class AdminService {
    private readonly SALT = parseInt(process.env.BCRYPT_SALT ?? "10");

    constructor(
        @InjectModel(Admin.name)
        private adminModel: Model<AdminDocument>,

        private readonly roleService: RoleService
    ) { }

    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, this.SALT)
    }

    async readAll(): Promise<IAdmin[]> {
        const admin = await this.adminModel.find();
        return admin;
    }

    async readSingle(keyVal: KeyValDto, select: string | null = null): Promise<IAdmin | null> {
        const query = this.adminModel.findOne(keyVal);

        if (select) {
            query.select(select);
        }
        const admin = await query.lean();

        if (!admin) {
            return null;
        }

        return admin
    }
}
