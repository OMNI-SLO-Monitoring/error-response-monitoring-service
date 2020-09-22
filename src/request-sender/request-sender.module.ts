import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/common/http';
import { AppService } from '../app.service';
import { RequestSenderController } from './request-sender.controller';
import { RequestSenderService } from './request-sender.service';

@Module({
  imports: [HttpModule],
  providers: [RequestSenderService, AppService,],
  controllers: [RequestSenderController],
  exports: [RequestSenderService, AppService],
})
export class RequestSenderModule {}
