import { Module } from '@nestjs/common';
import { SalaryPaymentService } from './services/salary-payment.service';
import { SalaryPaymentController } from './controllers/salary-payment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SalaryPayment } from './salary-payment.schema';
import { SalarySchema } from '@module/salary/salary.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: SalaryPayment.name, schema: SalarySchema}])],
  providers: [SalaryPaymentService],
  controllers: [SalaryPaymentController]
})
export class SalaryPaymentModule {}
