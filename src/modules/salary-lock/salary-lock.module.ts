import { Module } from '@nestjs/common';
import { SalaryLockService } from './services/salary-lock.service';
import { SalaryLockController } from './controllers/salary-lock.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SalaryLock, SalaryLockSchema } from './salary-lock.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: SalaryLock.name, schema: SalaryLockSchema}])],
  providers: [SalaryLockService],
  controllers: [SalaryLockController]
})
export class SalaryLockModule {}
