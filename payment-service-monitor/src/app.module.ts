import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { LoggingModule } from 'logging-module';
import { RequestSenderModule } from './request-sender/request-sender.module';
import { MonitoringSelectionModule } from './monitoring-selection/monitoring-selection.module';

@Module({
  imports: [LoggingModule, RequestSenderModule, MonitoringSelectionModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
