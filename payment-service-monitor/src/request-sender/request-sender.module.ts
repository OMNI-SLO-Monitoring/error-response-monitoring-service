import { Module, HttpModule, HttpService } from '@nestjs/common';
import { RequestSenderService } from './request-sender.service';
import { RequestSenderController } from './request-sender.controller';
import { AppService } from 'src/app.service';
import { IssueLoggingService } from 'logging-module';

@Module({
  imports: [HttpModule],
  providers: [RequestSenderService, AppService, IssueLoggingService],
  controllers: [RequestSenderController],
  exports: [RequestSenderService, AppService, IssueLoggingService],
})
export class RequestSenderModule {}
