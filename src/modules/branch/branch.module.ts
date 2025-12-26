import { Module } from '@nestjs/common';
import { BranchService } from './services/branch.service';
import { BranchController } from './controllers/branch.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Branch, BranchSchema } from './branch.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name:Branch.name, schema:BranchSchema}])
  ],
  providers: [BranchService],
  controllers: [BranchController]
})
export class BranchModule {}
