import { Test, TestingModule } from '@nestjs/testing';
import { RequestSenderController } from './request-sender.controller';
import { RequestSenderService } from './request-sender.service';
import { AppService } from '../app.service';
import { IssueLoggingService } from 'logging-module';
import { HttpModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

describe('RequestSender Controller', () => {
  let controller: RequestSenderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestSenderService, AppService, IssueLoggingService, ConfigService],
      controllers: [RequestSenderController],
      imports: [HttpModule],

    }).compile();

    controller = module.get<RequestSenderController>(RequestSenderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
