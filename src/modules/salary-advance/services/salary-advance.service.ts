import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SalaryAdvance, SalaryAdvanceDocument } from '../salary-advance.schema';
import { Model } from 'mongoose';
import { CreateSalaryAdvanceDto } from '../dto/create-salary-advance.dto';
import { ISalaryAdvance } from '../interfaces/salary-advance.interface';

@Injectable()
export class SalaryAdvanceService {
    constructor(
        @InjectModel(SalaryAdvance.name)
        private salaryAdvanceModel:Model<SalaryAdvanceDocument>
    ){}

    async create(reqData:any): Promise<any> {
        const created = await this.salaryAdvanceModel.create(reqData);
        return created;
    }
}
