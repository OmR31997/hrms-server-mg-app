import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Employee, EmployeeDocument } from '../employee.schema';
import { Connection, Model } from 'mongoose';
import { KeyValDto } from '../dto/key-val.dto';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { UpdateEmpoyeeDto } from '../dto/update-employee.dto';
import { IEmployee } from '../interfaces/employee.interface';
import { EmployeeHistoryService } from '@module/employee-history/services/employee-history.service';
import { withTransaction } from '@common/utils';

@Injectable()
export class EmployeeService {
    constructor(
        @InjectModel(Employee.name)
        private employeeModel: Model<EmployeeDocument>,
        
        @InjectConnection() 
        private readonly connection: Connection,
        
        private historyService: EmployeeHistoryService,
    ) { }

    async create(reqData: CreateEmployeeDto): Promise<IEmployee> {
        const created = await this.employeeModel.create(reqData);
        return created;
    }

    async readAll(): Promise<IEmployee[]> {
        const employees = await this.employeeModel.find().lean();

        return employees;
    }

    async readById(keyVal: KeyValDto): Promise<IEmployee> {
        const employee = await this.employeeModel.findOne(keyVal).lean();

        if (!employee) {
            throw new NotFoundException(`Employee not found for ID: '${keyVal["_id"]}'`);
        }

        return employee;
    }

    async update(keyVal: KeyValDto, reqData: UpdateEmpoyeeDto, role: string): Promise<IEmployee> {

        return withTransaction(this.connection, async (session) => {
            const employee = await this.employeeModel.findOne(keyVal).session(session);

            if (!employee) {
                throw new NotFoundException(`Employee not found for ID: '${keyVal._id}'`)
            }

            for (const [field, newValue] of Object.entries(reqData)) {
                const oldValue = employee[field];

                if (oldValue !== newValue) {
                    await this.historyService.create(
                        {
                            employee_id: employee._id.toString(),
                            field_name: field,
                            old_value: oldValue,
                            new_value: newValue,
                            changed_by: role
                        },
                        session
                    );
                }
            }

            Object.assign(employee, reqData);
            await employee.save({ session });

            return employee;
        })
    }

    async delete(keyVal: KeyValDto): Promise<IEmployee> {
        const deleted = await this.employeeModel.findOneAndDelete(keyVal);

        if (!deleted) {
            throw new NotFoundException(`Employee not found for ID: '${keyVal["_id"]}'`);
        }

        return deleted;
    }
}