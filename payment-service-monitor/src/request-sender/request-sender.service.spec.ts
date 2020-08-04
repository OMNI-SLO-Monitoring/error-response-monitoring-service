import { Test, TestingModule } from '@nestjs/testing';
import { RequestSenderService } from './request-sender.service';
import { HttpService, HttpModule } from '@nestjs/common/http';
import { AppService } from '../app.service';
import { IssueLoggingService } from 'logging-module';

describe('RequestSenderService', () => {
  let service: RequestSenderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestSenderService, AppService, IssueLoggingService],
      imports: [HttpModule],
    }).compile();

    service = module.get<RequestSenderService>(RequestSenderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
