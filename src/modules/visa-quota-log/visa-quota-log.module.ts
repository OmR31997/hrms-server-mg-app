import { Module } from '@nestjs/common';
import { VisaQuotaLogService } from './services/visa-quota-log.service';
import { VisaQuotaLogController } from './controllers/visa-quota-log.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { VisaQuotaLog, VisaQuotaLogSchema } from './visa_quota_log.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: VisaQuotaLog.name, schema: VisaQuotaLogSchema }])],
  providers: [VisaQuotaLogService],
  controllers: [VisaQuotaLogController]
})
export class VisaQuotaLogModule { }
