import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Company, CompanyDocument } from '../company.schema';
import { Model } from 'mongoose';
import { success, SuccessResponse } from 'src/utils/respons.interface';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpadateCompanyDto } from '../dto/update-company.dto';

@Injectable()
export class CompanyService {
    constructor(@InjectModel(Company.name) private companyModel: Model<CompanyDocument>) { };

    async create(reqData: CreateCompanyDto): Promise<SuccessResponse> {

        const created = await this.companyModel.create(reqData);

        return success("Company created successfully.", created);
    }

    async readAll(): Promise<SuccessResponse> {
        const companies = await this.companyModel.find().lean();

        return success("Data fetched successfully.", companies);
    }

    async readById(keyWal: Object): Promise<SuccessResponse> {
        const company = await this.companyModel.findOne(keyWal).lean();

        if (!company) {
            throw new NotFoundException(`Company not found for ID: '${keyWal["_id"]}'`);
        }

        return success("Data fetched successfully.", company);
    }

    async update(keyWal: Object, reqData: UpadateCompanyDto): Promise<SuccessResponse> {
        
        const updated = await this.companyModel.findOneAndUpdate(keyWal, reqData, { new: true, runValidators: true });

        if (!updated) {
            throw new NotFoundException(`Company not found for ID: '${keyWal["_id"]}'`);
        }

        return success("Data fetched successfully.", updated);
    }

    async delete(keyWal: Object): Promise<SuccessResponse> {
        const deleted = await this.companyModel.findOneAndDelete(keyWal);

        if (!deleted) {
            throw new NotFoundException(`Company not found for ID: '${keyWal["_id"]}'`);
        }

        return success("Data fetched successfully.", deleted);
    }
}