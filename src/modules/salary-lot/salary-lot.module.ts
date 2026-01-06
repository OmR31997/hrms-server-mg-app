import { Module } from '@nestjs/common';
import { SalaryLotService } from './services/salary-lot.service';
import { SalaryLotController } from './controllers/salary-lot.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SalaryLoc, SalaryLocSchema } from '@module/salary-lock/salary-lock.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: SalaryLoc.name, schema: SalaryLocSchema}])
  ],
  providers: [SalaryLotService],
  controllers: [SalaryLotController]
})
export class SalaryLotModule {}
