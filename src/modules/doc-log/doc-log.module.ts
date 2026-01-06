import { Module } from '@nestjs/common';
import { DocLogService } from './services/doc-log.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DocLog, DocLogSchema } from './document_log.schema';
import { DocLogController } from './controllers/doc-log.controller';

@Module({
  imports: [MongooseModule.forFeature([{name: DocLog.name, schema: DocLogSchema}])],
  providers: [DocLogService],
  controllers: [DocLogController],
  exports: [DocLogService]
})
export class DocLogModule {}
