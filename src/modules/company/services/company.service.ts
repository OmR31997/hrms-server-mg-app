import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Company, CompanyDocument } from '../company.schema';
import { Model, Types } from 'mongoose';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpadateCompanyDto } from '../dto/update-company.dto';
import { KeyValDto } from '../dto/key-val.dto';
import { ICompany } from '../interfaces/company.interface';
import { generateRefreshToken as generateTrn } from '@common/utils';
import { JwtRequestPayload } from '@common/types/payload.type';

@Injectable()
export class CompanyService {
    constructor(@InjectModel(Company.name) private companyModel: Model<CompanyDocument>) { };

    async create(reqData: CreateCompanyDto, user:JwtRequestPayload): Promise<ICompany> {
        const trn = generateTrn();

        const created = await this.companyModel.create({
            ...reqData,
            trn,
            created_by: new Types.ObjectId(user.role_id)
        });
        return created;
    }

    async readAll(): Promise<ICompany[]> {
        const companies = await this.companyModel.find().lean();
        return companies;
    }

    async readOne(keyVal: KeyValDto): Promise<ICompany> {
        const company = await this.companyModel.findOne(keyVal).lean();

        if (!company) {
            throw new NotFoundException(`Company not found for ID: '${keyVal["_id"]}'`);
        }

        return company;
    }

    async update(keyVal: KeyValDto, reqData: UpadateCompanyDto): Promise<ICompany> {
        
        const updated = await this.companyModel.findOneAndUpdate(keyVal, reqData, { new: true, runValidators: true });

        if (!updated) {
            throw new NotFoundException(`Company not found for ID: '${keyVal["_id"]}'`);
        }

        return updated;
    }

    async delete(keyVal: KeyValDto): Promise<ICompany> {
        const deleted = await this.companyModel.findOneAndDelete(keyVal);

        if (!deleted) {
            throw new NotFoundException(`Company not found for ID: '${keyVal["_id"]}'`);
        }

        return deleted;
    }
}