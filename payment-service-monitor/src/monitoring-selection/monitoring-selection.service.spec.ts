import { Test, TestingModule } from '@nestjs/testing';
import { MonitoringSelectionService } from './monitoring-selection.service';
import { Selection } from './schema/selection.schema';
import { MonitoringSelectionDTO } from './dto/monitoring-selection.dto';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { identity } from 'rxjs';

describe('MonitoringSelectionService', () => {
  let service: MonitoringSelectionService;
  //Acts as a mock entry in the database
  const mockDBEntry = {
    name: 'Price Service',
    serviceUrl: 'http://localhost:3300',
  };

  beforeEach(async () => {
    //This mocks the database and its functions
    function dbMock(dto: any) {
      var serviceList = [];
      this.save = () => {
        serviceList.push(dto);
        return dto;
      };
      this.findByIdAndDelete = id => {
        var index: number = +id;
        if (serviceList[index]) {
          var temp = serviceList[index];
          serviceList[index] = null;
          return temp;
        } else {
          return 'Not in Database';
        }
      };
      this.find = ({ serviceUrl: requestUrl }) => {
        serviceList.forEach(element => {
          if (element.serviceUrl === requestUrl) {
            return element;
          }
        });
        return 'Not in Database';
      };
    }

    class mockDB {
      serviceList: any[] = [];
      constructor(dto: any) {
        this.serviceList.push(dto);
      }
      save() {
        return this.serviceList[this.serviceList.length - 1];
      }

      findByIdAndDelete(id) {
        var index: number = +id;
        if (this.serviceList[index]) {
          var temp = this.serviceList[index];
          this.serviceList[index] = null;
          return temp;
        } else {
          return 'Not in Database';
        }
      }

      find = ({ serviceUrl: requestUrl }) => {
        this.serviceList.forEach(element => {
          if (element.serviceUrl === requestUrl) {
            return element;
          }
        });
        return 'Not in Database';
      };
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MonitoringSelectionService,
        {
          provide: getModelToken('selection'),
          useValue: mockDB,
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
  it('should add and return the correct monitor data', async () => {
    expect(await service.addSelectionToDatabase(mockDBEntry)).toBe(mockDBEntry);
  });
});
