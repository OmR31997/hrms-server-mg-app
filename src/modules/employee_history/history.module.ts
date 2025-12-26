import { Module } from '@nestjs/common';
import { HistoryService } from './services/history.service';
import { HistoryController } from './controllers/history.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeHistory, EmployeeHistorySchema } from './employee_history.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: EmployeeHistory.name, schema: EmployeeHistorySchema }])],
    providers: [HistoryService],
    controllers: [HistoryController],
    exports: [HistoryService]
})
export class HistoryModule { }