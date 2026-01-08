import { Module } from '@nestjs/common';
import { LeaveHistoryService } from './services/leave-history.service';
import { LeaveHistoryController } from './controllers/leave-history.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LeaveHistory, LeaveHistorySchema } from './leave-history.schema';

@Module({
  imports: [MongooseModule.forFeature([{name:LeaveHistory.name, schema: LeaveHistorySchema}])],
  providers: [LeaveHistoryService],
  controllers: [LeaveHistoryController]
})
export class LeaveHistoryModule {}
