import { Module } from '@nestjs/common';
import { SalaryController } from './controllers/salary.controller';
import { SalaryService } from './services/salary.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Salary, SalarySchema } from './salary.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: Salary.name, schema: SalarySchema}])],
  providers: [SalaryService],
  controllers: [SalaryController]
})
export class SalaryModule {}
