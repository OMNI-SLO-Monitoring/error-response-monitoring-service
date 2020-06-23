import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggingModule, IssueLoggingService } from 'logging-module';
import { RequestSenderModule } from './request-sender/request-sender.module';

@Module({
  imports: [HttpModule, LoggingModule, RequestSenderModule],
  controllers: [AppController],
  providers: [IssueLoggingService],
})
export class AppModule {}
