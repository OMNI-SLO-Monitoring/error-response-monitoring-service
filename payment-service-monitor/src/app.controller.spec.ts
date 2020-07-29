import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MonitoringSelectionService } from './monitoring-selection/monitoring-selection.service';
import { IssueLoggingService } from 'logging-module';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;
  let monitoringSelectionService: MonitoringSelectionService;
  let loggingService: IssueLoggingService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, MonitoringSelectionService, IssueLoggingService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
    monitoringSelectionService = app.get<MonitoringSelectionService>(
      MonitoringSelectionService,
    );
    loggingService = app.get<IssueLoggingService>(IssueLoggingService);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });
});
