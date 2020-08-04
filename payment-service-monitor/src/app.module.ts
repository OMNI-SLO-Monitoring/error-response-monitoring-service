import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { LoggingModule } from 'logging-module';
import { RequestSenderModule } from './request-sender/request-sender.module';
import { MonitoringSelectionModule } from './monitoring-selection/monitoring-selection.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SelectionSchema } from './monitoring-selection/schema/selection.schema';

@Module({
  imports: [
    LoggingModule,
    MonitoringSelectionModule,
    RequestSenderModule,
    MongooseModule.forRoot('mongodb://localhost:27017/logDatabase'),
  ],
  controllers: [AppController],
})
export class AppModule {}
