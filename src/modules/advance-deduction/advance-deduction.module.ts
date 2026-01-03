import { Module } from '@nestjs/common';
import { AdvanceDeduction, AdvanceDeductionSchema } from './advance-deduction.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AdvanceDeductionService } from './services/advance-deduction.service';
import { AdvanceDeductionController } from './controllers/advance-deduction.controller';

@Module({
    imports: [MongooseModule.forFeature([{name: AdvanceDeduction.name, schema: AdvanceDeductionSchema}])],
    providers: [AdvanceDeductionService],
    controllers: [AdvanceDeductionController],
})
export class AdvanceDeductionModule {}
