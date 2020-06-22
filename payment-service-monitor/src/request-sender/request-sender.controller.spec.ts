import { Test, TestingModule } from '@nestjs/testing';
import { RequestSenderController } from './request-sender.controller';

describe('RequestSender Controller', () => {
  let controller: RequestSenderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestSenderController],
    }).compile();

    controller = module.get<RequestSenderController>(RequestSenderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
