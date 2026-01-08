import { Module } from '@nestjs/common';
import { SystemJobService } from './services/system-job.service';
import { SystemJobController } from './controllers/system-job.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SystemJob, SystemJobSchema } from './system-job.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: SystemJob.name, schema: SystemJobSchema}])],
  providers: [SystemJobService],
  controllers: [SystemJobController]
})
export class SystemJobModule {}
