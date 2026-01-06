import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdvanceHistory, AdvanceHistorySchema } from './advance-history.schema';
import { AdvanceHistoryService } from './services/advance-history.service';
import { AdvanceHistoryController } from './controllers/advance-history.controller';

@Module({
    imports: [MongooseModule.forFeature([{name: AdvanceHistory.name, schema: AdvanceHistorySchema}])],
    providers: [AdvanceHistoryService],
    controllers: [AdvanceHistoryController],
    exports: [AdvanceHistoryService]
})
export class AdvanceHistoryModule {
    constructor(){}
}
