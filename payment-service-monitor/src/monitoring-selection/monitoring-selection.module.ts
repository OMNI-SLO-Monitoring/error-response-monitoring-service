import { Module } from '@nestjs/common';
import { MonitoringSelectionService } from './monitoring-selection.service';
import { MonitoringSelectionController } from './monitoring-selection.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SelectionSchema } from './schema/selection.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/logDatabase'),
    MongooseModule.forFeature([{ name: 'selection', schema: SelectionSchema }]),
  ],
  controllers: [MonitoringSelectionController],
  providers: [MonitoringSelectionService],
  exports: [MonitoringSelectionService],
})
export class MonitoringSelectionModule {}
