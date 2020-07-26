import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { AppService } from './app.service';
import { LoggingModule, IssueLoggingService } from 'logging-module';
import { RequestSenderModule } from './request-sender/request-sender.module';
import { SelectionSchema } from './monitoring-selection/schema/selection.schema';
import { MonitoringSelectionService } from './monitoring-selection/monitoring-selection.service';
import { MonitoringSelectionController } from './monitoring-selection/monitoring-selection.controller';

@Module({
  imports: [HttpModule, LoggingModule, RequestSenderModule,
  MongooseModule.forRoot('mongodb://localhost:27017/logDatabase'),
  MongooseModule.forFeature([{name: 'selection', schema: SelectionSchema}])],
  controllers: [AppController, MonitoringSelectionController],
  providers: [IssueLoggingService, MonitoringSelectionService],
})
export class AppModule {}

