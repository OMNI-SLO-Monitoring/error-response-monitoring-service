import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MonitoringSelectionService } from './monitoring-selection/monitoring-selection.service';
import { IssueLoggingService } from 'logging-module';
import { getModelToken } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/common';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        MonitoringSelectionService,
        IssueLoggingService,
        {
          provide: getModelToken('selection'),
          useValue: {},
        },
      ],
      imports: [HttpModule],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });
});
