import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdvanceHistory, AdvanceHistorySchema } from './advance-history.schema';

@Module({
    imports: [MongooseModule.forFeature([{name: AdvanceHistory.name, schema: AdvanceHistorySchema}])],
})
export class AdvanceHistoryModule {
    constructor(){}
}
