import { Module } from '@nestjs/common';
import { RequestSenderService } from './request-sender.service';
import { RequestSenderController } from './request-sender.controller';
import { AppService } from '../app.service';
import { IssueLoggingService } from 'logging-module';
import { HttpModule, HttpService } from '@nestjs/common/http';
import { MonitoringSelectionModule } from 'src/monitoring-selection/monitoring-selection.module';

@Module({
  imports: [HttpModule, MonitoringSelectionModule],
  providers: [RequestSenderService, AppService, IssueLoggingService],
  controllers: [RequestSenderController],
  exports: [RequestSenderService, AppService, IssueLoggingService],
})
export class RequestSenderModule {}
