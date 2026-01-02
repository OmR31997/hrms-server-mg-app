import { Module } from '@nestjs/common';
import { BankAccountHistoryService } from './services/bank-account-history.service';
import { BankAccountHistoryController } from './controllers/bank-account-history.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BankAccountHistory, BankAccountHistorySchema } from './bank-account-history.schema';

@Module({

  imports: [MongooseModule.forFeature([{ name: BankAccountHistory.name, schema: BankAccountHistorySchema }])],
  providers: [BankAccountHistoryService],
  controllers: [BankAccountHistoryController]
})
export class BankAccountHistoryModule { }
