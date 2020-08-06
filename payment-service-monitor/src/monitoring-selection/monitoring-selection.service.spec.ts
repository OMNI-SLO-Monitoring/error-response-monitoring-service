import { Test, TestingModule } from '@nestjs/testing';
import { MonitoringSelectionService } from './monitoring-selection.service';
import { getModelToken } from '@nestjs/mongoose';
import { dbMock } from './database-mock';

describe('MonitoringSelectionService', () => {
  let service: MonitoringSelectionService;

  //A mock service entry
  const mockDBEntry = {
    _id: '1',
    name: 'Price Service',
    serviceUrl: 'http://localhost:3300',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MonitoringSelectionService,
        {
          provide: getModelToken('selection'),
          useValue: new dbMock(mockDBEntry),
        },
      ],
    }).compile();

    service = module.get<MonitoringSelectionService>(
      MonitoringSelectionService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  /**
   * This test functions probes the operation that adds a given service to
   * the database.
   */
  it('should add and return the correct service data', async () => {
    //expect(await service.addSelectionToDatabase(mockDBEntry)).toBe(mockDBEntry);
  });

  /**
   * This test function probes whether or not a service with the given url
   * is in the mock database. In this case, the corresponding mock service entries
   * should be found and returned.
   */
  it('should be finding a registered service', async () => {
    expect(
      await service.checkIfServiceIsSelected({
        serviceUrl: 'http://localhost:3300',
      }),
    ).toEqual([mockDBEntry]);
  });

  /**
   * This test function probes whether or not a service with the given url
   * is in the mock database. In this case, the corresponding mock service entry
   * does not exist in the mock database and an empty array is hence returned.
   */
  it('should not be finding a registered service', async () => {
    expect(
      await service.checkIfServiceIsSelected({
        serviceUrl: 'http://localhost:3000',
      }),
    ).toEqual([]);
  });

  /**
   * This test function probes whether or not a service with the given unique id
   * is in the mock database. In this case, the corresponding mock service entry
   * will be deleted and returned. Afterwards an error message must be returned when checking
   * if the already deleted service is still in the database.
   */
  it('should delete the registered service from the database', async () => {
    expect(await service.deleteService('1')).toMatchObject(mockDBEntry);
    expect(await service.deleteService('1')).toBe('Not in Database');
  });

  /**
   * This test function probes whether or not a service with the given unique id
   * is in the mock database. In this case, the corresponding mock service entry
   * does not exist in the database and hence a mock error message is returned.
   */
  it('should not be able to delete registered service from the database', async () => {
    expect(await service.deleteService('2')).toBe('Not in Database');
  });
});
