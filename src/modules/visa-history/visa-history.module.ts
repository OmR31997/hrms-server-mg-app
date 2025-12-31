import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VisaHistory, VisaHistorySchema, } from './visa_history.schema';
import { VisaHistoryService } from './services/visa-history.service';
import { VisaHistoryController } from './controllers/visa-history.controller';

@Module({
    imports: [MongooseModule.forFeature([{ name: VisaHistory.name, schema: VisaHistorySchema }])],
    providers: [VisaHistoryService],
    controllers: [VisaHistoryController],
    exports: [VisaHistoryService]
})
export class VisaHistoryModule { }
