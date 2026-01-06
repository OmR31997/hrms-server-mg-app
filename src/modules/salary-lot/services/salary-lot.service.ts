import { Injectable } from '@nestjs/common';
import { CreateSalaryLotDto } from '../dto/create-salary-lot.dto';

@Injectable()
export class SalaryLotService {
    constructor(){}

    async create(reqData: CreateSalaryLotDto) {

    }
}
