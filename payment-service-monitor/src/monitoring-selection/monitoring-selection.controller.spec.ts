import { Test, TestingModule } from '@nestjs/testing';
import { MonitoringSelectionController } from './monitoring-selection.controller';

describe('MonitoringSelection Controller', () => {
  let controller: MonitoringSelectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MonitoringSelectionController],
    }).compile();

    controller = module.get<MonitoringSelectionController>(MonitoringSelectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
