import { Test, TestingModule } from '@nestjs/testing';
import { MonitoringSelectionController } from './monitoring-selection.controller';
import { MonitoringSelectionService } from './monitoring-selection.service';

describe('MonitoringSelection Controller', () => {
  let controller: MonitoringSelectionController;
  let service: MonitoringSelectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MonitoringSelectionController],
      providers: [MonitoringSelectionService],
    }).compile();

    controller = module.get<MonitoringSelectionController>(
      MonitoringSelectionController,
    );
    service = module.get<MonitoringSelectionService>(
      MonitoringSelectionService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
