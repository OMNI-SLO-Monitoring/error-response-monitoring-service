import { Test, TestingModule } from '@nestjs/testing';
import { MonitoringSelectionController } from './monitoring-selection.controller';
import { MonitoringSelectionService } from './monitoring-selection.service';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { SelectionSchema } from './schema/selection.schema';

describe('MonitoringSelection Controller', () => {
  let controller: MonitoringSelectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MonitoringSelectionController],
      providers: [
        MonitoringSelectionService,
        {
          provide: getModelToken('selection'),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<MonitoringSelectionController>(
      MonitoringSelectionController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
