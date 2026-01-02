import { Module } from '@nestjs/common';
import { BankAccountService } from './services/bank-account.service';
import { BankAccountController } from './controllers/bank-account.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BankAccount, BankAccountSchema } from './bank-account.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: BankAccount.name, schema: BankAccountSchema}])],
  providers: [BankAccountService],
  controllers: [BankAccountController]
})
export class BankAccountModule {}
