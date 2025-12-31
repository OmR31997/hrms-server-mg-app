import { Module } from '@nestjs/common';
import { DocLogController } from './controllers/doc-log.controller';
import { DocLogService } from './services/doc-log.service';

@Module({
  providers: [DocLogService],
  controllers: [DocLogController]
})
export class DocLogModule {}
