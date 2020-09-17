import { HttpModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { LogMessageFormat, LogType } from 'logging-format';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  jest.mock('./app.service');
  jest.mock('./request-sender/request-sender.service');

  let appController: AppController;
  let appService: AppService;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
      imports: [HttpModule, ConfigService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  /**
   * Test function that probes whether the log message array
   * is fetched properly
   */
  it('should give return a message array', async () => {
    const expectedResult: LogMessageFormat[] = [
      {
        type: LogType.CB_OPEN,
        time: Date.now(),
        sourceUrl: 'Database Service',
        detectorUrl: 'Price Service',
        data: {
          openTime: 31,
          failedResponses: 3,
        },
      },
    ];
    jest
      .spyOn(appService, 'getAllMessages')
      .mockImplementationOnce(() => expectedResult);
    expect(await appController.getAllMessages()).toMatchObject(expectedResult);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
