import { Module } from '@nestjs/common';
import { EmployeeService } from './services/employee.service';
import { EmployeeController } from './controllers/employee.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Employee, EmployeeSchema } from './employee.schema';
import { HistoryModule } from '../employee_history/history.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Employee.name, schema: EmployeeSchema}]),
    HistoryModule
  ],
  providers: [EmployeeService],
  controllers: [EmployeeController]
})
export class EmployeeModule {}
