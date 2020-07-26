import { Test, TestingModule } from '@nestjs/testing';
import { MonitoringSelectionService } from './monitoring-selection.service';

describe('MonitoringSelectionService', () => {
  let service: MonitoringSelectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MonitoringSelectionService],
    }).compile();

    service = module.get<MonitoringSelectionService>(MonitoringSelectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
