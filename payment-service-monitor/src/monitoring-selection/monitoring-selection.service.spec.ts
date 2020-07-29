import { Test, TestingModule } from '@nestjs/testing';
import { MonitoringSelectionService } from './monitoring-selection.service';
import { Selection } from './schema/selection.schema';
import { MonitoringSelectionDTO } from './dto/monitoring-selection.dto';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

describe('MonitoringSelectionService', () => {
  let service: MonitoringSelectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MonitoringSelectionService],
      imports: [MongooseModule],
    }).compile();

    service = module.get<MonitoringSelectionService>(
      MonitoringSelectionService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
