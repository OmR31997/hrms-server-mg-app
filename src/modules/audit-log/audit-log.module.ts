import { Module } from '@nestjs/common';
import { AuditLogService } from './services/audit-log.service';
import { AuditLogController } from './controllers/audit-log.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuditLog, AuditLogSchema } from './audit-log.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: AuditLog.name, schema: AuditLogSchema}])],
  providers: [AuditLogService],
  controllers: [AuditLogController]
})
export class AuditLogModule {}
