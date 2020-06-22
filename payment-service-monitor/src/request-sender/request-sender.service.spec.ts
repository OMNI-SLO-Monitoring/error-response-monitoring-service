import { Test, TestingModule } from '@nestjs/testing';
import { RequestSenderService } from './request-sender.service';

describe('RequestSenderService', () => {
  let service: RequestSenderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestSenderService],
    }).compile();

    service = module.get<RequestSenderService>(RequestSenderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
