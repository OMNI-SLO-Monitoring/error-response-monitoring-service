import { Module } from '@nestjs/common';
import { RequestSenderService } from './request-sender.service';
import { RequestSenderController } from './request-sender.controller';

@Module({
  providers: [RequestSenderService],
  controllers: [RequestSenderController],
  exports: [RequestSenderService],
})
export class RequestSenderModule {}
