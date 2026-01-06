import { Module } from '@nestjs/common';
import { SalaryAdvanceService } from './services/salary-advance.service';
import { SalaryAdvanceController } from './controllers/salary-advance.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SalaryAdvance, SalaryAdvanceSchema } from './salary-advance.schema';
import { AdvanceHistoryModule } from '@module/advance-history/advance-history.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: SalaryAdvance.name, schema: SalaryAdvanceSchema}]),
    AdvanceHistoryModule
  ],
  providers: [SalaryAdvanceService],
  controllers: [SalaryAdvanceController]
})
export class SalaryAdvanceModule {}
