import { Module } from '@nestjs/common';
import { BranchTransferService } from './services/branch-transfer.service';
import { BranchTransferController } from './controllers/branch-transfer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BranchTransfer, BranchTransferSchema } from './branch-transfer.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: BranchTransfer.name, schema: BranchTransferSchema }])],
  providers: [BranchTransferService],
  controllers: [BranchTransferController],
  exports: [BranchTransferService]
})
export class BranchTransferModule { }
