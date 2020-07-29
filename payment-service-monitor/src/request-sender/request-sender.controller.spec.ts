import { Test, TestingModule } from '@nestjs/testing';
import { RequestSenderController } from './request-sender.controller';
import { RequestSenderService } from './request-sender.service';
import { Request } from 'express';

describe('RequestSender Controller', () => {
  let controller: RequestSenderController;
  let service: RequestSenderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestSenderController],
      providers: [RequestSenderService],
    }).compile();

    controller = module.get<RequestSenderController>(RequestSenderController);
    service = module.get<RequestSenderService>(RequestSenderService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
