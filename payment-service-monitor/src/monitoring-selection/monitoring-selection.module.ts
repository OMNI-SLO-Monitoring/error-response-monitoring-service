import { Module } from '@nestjs/common';
import { MonitoringSelectionService } from './monitoring-selection.service';
import { MonitoringSelectionController } from './monitoring-selection.controller';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { SelectionSchema } from './schema/selection.schema';
import { Model, Mongoose } from 'mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'selection', schema: SelectionSchema }]),
  ],
  controllers: [MonitoringSelectionController],
  providers: [MonitoringSelectionService],
  exports: [
    MonitoringSelectionService,
    MongooseModule.forFeature([{ name: 'selection', schema: SelectionSchema }]),
  ],
})
export class MonitoringSelectionModule {}
