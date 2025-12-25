import { Module } from '@nestjs/common';
import { CompanyService } from './services/company.service';
import { CompanyController } from './controllers/company.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, CompanySchema } from './company.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }])],
  providers: [CompanyService],
  controllers: [CompanyController],
})
export class CompanyModule {}
