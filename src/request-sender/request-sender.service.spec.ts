import { HttpModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { ErrorFormat, LogMessageFormat, LogType } from 'logging-format';
import { AppService } from '../app.service';
import { RequestSenderService } from './request-sender.service';

jest.mock('kafkajs')
describe('RequestSenderService', () => {
  let service: RequestSenderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestSenderService, AppService, ConfigService],
      imports: [HttpModule ],
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
      sourceUrl: "http://localhost:3000/",
      detectorUrl: "http://localhost:3400/",
      message: 'Incorrect Parameters',
      data: {
        expected: 30,
        actual: 31,
      },
    };
    let error:ErrorFormat = await service.createAndSendLog(
      "http://localhost:3000/",
      'Incorrect Parameters',
      30,
      31,
    );
    expect(error.log).toStrictEqual(expectedLog);
  });
});
