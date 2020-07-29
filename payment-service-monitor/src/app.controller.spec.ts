import { HttpModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { LogMessageFormat } from 'logging-format';
import { IssueLoggingService } from 'logging-module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RequestSenderService } from './request-sender/request-sender.service';

describe('AppController', () => {
  jest.mock('./app.service')
  jest.mock('./request-sender/request-sender.service')

  let appController: AppController;
  let appService: AppService;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, RequestSenderService, IssueLoggingService],
      imports: [HttpModule]
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  it('should give Message Array', async () => {
    const expectedResult: LogMessageFormat[] = [];
    expect(await appService.getAllMessages()).toMatchObject(expectedResult);
  });


  afterEach(() => {
    jest.resetAllMocks();
  });
});
