import { Test, TestingModule } from '@nestjs/testing';
import { RequestSenderService } from './request-sender.service';
import { HttpService } from '@nestjs/common/http';
import { AppService } from '../app.service';

describe('RequestSenderService', () => {
  let service: RequestSenderService;
  let http: HttpService;
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestSenderService, HttpService, AppService],
    }).compile();

    service = module.get<RequestSenderService>(RequestSenderService);
    http = module.get<HttpService>(HttpService);
    appService = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
