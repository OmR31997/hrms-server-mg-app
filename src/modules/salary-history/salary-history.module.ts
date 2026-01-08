import { Module } from '@nestjs/common';
import { SalaryHistoryService } from './services/salary-history.service';
import { SalaryHistoryController } from './controllers/salary-history.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SalaryHistory } from './salary-history.schema';
import { SalarySchema } from '@module/salary/salary.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: SalaryHistory.name, schema: SalarySchema}])],
  providers: [SalaryHistoryService],
  controllers: [SalaryHistoryController]
})
export class SalaryHistoryModule {}
