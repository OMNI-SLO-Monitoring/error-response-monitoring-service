import { Test, TestingModule } from '@nestjs/testing';
import { MonitoringSelectionService } from './monitoring-selection.service';
import { MonitoringSelectionDTO } from './dto/monitoring-selection.dto';

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

  it("should add the valid service to the monitoring selection", () => {
    const testService: MonitoringSelectionDTO = {
      name: "testService",
      serviceUrl: "someUrl",
    }
    expect(service.addSelectionToDatabase(testService)).toBe(testService);
  })
});
