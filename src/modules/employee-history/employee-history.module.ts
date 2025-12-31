import { Module } from '@nestjs/common';
import { EmployeeHistoryService } from './services/employee-history.service';
import { EmployeeHistoryController } from './controllers/employee-history.controller';
import { EmployeeHistory, EmployeeHistorySchema } from './employee_history.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: EmployeeHistory.name, schema: EmployeeHistorySchema }])],
  providers: [EmployeeHistoryService],
  controllers: [EmployeeHistoryController],
  exports: [EmployeeHistoryService]
})
export class EmployeeHistoryModule {}
