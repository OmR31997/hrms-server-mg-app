import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Employee, EmployeeDocument } from '../employee.schema';
import { Connection, Model } from 'mongoose';
import { success, SuccessResponse } from 'src/utils/respons.interface';
import { KeyValDto } from '../dto/key-val.dto';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { UpdateEmpoyeeDto } from '../dto/update-employee.dto';
import { withTransaction } from 'src/utils/transaction.util';
import { HistoryService } from 'src/modules/employee_history/services/history.service';

@Injectable()
export class EmployeeService {
    constructor(
        @InjectModel(Employee.name)
        private employeeModel: Model<EmployeeDocument>,
        
        @InjectConnection() private readonly connection: Connection,
        private historyService: HistoryService,
    ) { }

    async create(reqData: CreateEmployeeDto): Promise<SuccessResponse> {
        const created = await this.employeeModel.create(reqData);
        return success("Emplyee created successfully", created);
    }

    async readAll(): Promise<SuccessResponse> {
        const employees = await this.employeeModel.find().lean();

        return success("Data fetched successfully.", employees);
    }

    async readById(keyVal: KeyValDto): Promise<SuccessResponse> {
        const employee = await this.employeeModel.findOne(keyVal).lean();

        if (!employee) {
            throw new NotFoundException(`Employee not found for ID: '${keyVal["_id"]}'`);
        }

        return success("Data fetched successfully.", employee);
    }

    async update(keyVal: KeyValDto, reqData: UpdateEmpoyeeDto, role: string): Promise<SuccessResponse> {

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

            return success("Employee updated successfully", employee);
        })
    }

    async delete(keyVal: KeyValDto): Promise<SuccessResponse> {
        const deleted = await this.employeeModel.findOneAndDelete(keyVal);

        if (!deleted) {
            throw new NotFoundException(`Employee not found for ID: '${keyVal["_id"]}'`);
        }

        return success("Employee deleted successfully.", deleted);
    }
}