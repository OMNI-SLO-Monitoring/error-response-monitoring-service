import { Module } from '@nestjs/common';
import { RequestSenderService } from './request-sender.service';
import { RequestSenderController } from './request-sender.controller';
import { AppService } from '../app.service';
import { HttpModule, HttpService } from '@nestjs/common/http';

@Module({
  imports: [HttpModule],
  providers: [RequestSenderService, AppService,],
  controllers: [RequestSenderController],
  exports: [RequestSenderService, AppService],
})
export class RequestSenderModule {}
