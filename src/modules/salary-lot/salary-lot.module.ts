import { Module } from '@nestjs/common';
import { SalaryLotService } from './services/salary-lot.service';
import { SalaryLotController } from './controllers/salary-lot.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SalaryLot, SalaryLotSchema } from './salaray-lot.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: SalaryLot.name, schema: SalaryLotSchema}])
  ],
  providers: [SalaryLotService],
  controllers: [SalaryLotController]
})
export class SalaryLotModule {}
