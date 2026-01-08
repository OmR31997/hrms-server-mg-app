import { Module } from '@nestjs/common';
import { LeaveService } from './services/leave.service';
import { LeaveController } from './controllers/leave.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Leave, LeaveSchema } from './leave.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: Leave.name, schema: LeaveSchema}])],
  providers: [LeaveService],
  controllers: [LeaveController]
})
export class LeaveModule {}
