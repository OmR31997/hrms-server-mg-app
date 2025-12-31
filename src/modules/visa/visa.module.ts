import { Module } from '@nestjs/common';
import { VisaService } from './services/visa.service';
import { VisaController } from './controllers/visa.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Visa, VisaSchema } from './visa.schema';
import { VisaHistoryModule } from '../visa-history/visa-history.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Visa.name, schema: VisaSchema }]),
    VisaHistoryModule
  ],
  providers: [VisaService],
  controllers: [VisaController]
})
export class VisaModule { }
