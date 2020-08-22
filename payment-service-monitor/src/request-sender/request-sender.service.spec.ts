import { Test, TestingModule } from '@nestjs/testing';
import { RequestSenderService } from './request-sender.service';
import { AppService } from '../app.service';
import { LogType, LogMessageFormat } from 'logging-format';
import { HttpService, HttpModule } from '@nestjs/common';

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

  /**
   * Test function that probes if a valid log is created
   * when using createAndSendLog operation
   */
  it('should create valid log',async () => {
    const expectedLog: LogMessageFormat = {
      type: LogType.ERROR,
      time: Date.now(),
      source: 'Database Service',
      detector: 'Error Response Monitor',
      message: 'Incorrect Parameters',
      data: {
        expected: 30,
        result: 31,
      },
    };
    expect(
      await service.createAndSendLog(
        'Database Service',
        'Incorrect Parameters',
        30,
        31,
      ),
    ).toStrictEqual(expectedLog);
  });
});
